import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

import {
  emitNewMessage,
  emitMessageDelivered,
  emitMessageRead,
  emitMessageDeleted,
} from "../socket/socket.events.js";

/**
 * ---------------------------------------------------------
 * Helper: Validate ObjectId
 * ---------------------------------------------------------
 */
const validateObjectId = (id, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ${fieldName}`);
    error.statusCode = 400;
    throw error;
  }
};

/**
 * ---------------------------------------------------------
 * Helper: Check conversation participant
 * ---------------------------------------------------------
 */
const getConversationForParticipant = async ({
  conversationId,
  userId,
}) => {
  validateObjectId(conversationId, "conversation ID");
  validateObjectId(userId, "user ID");

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: userId,
  });

  if (!conversation) {
    const error = new Error(
      "Conversation not found or you are not a participant"
    );

    error.statusCode = 404;
    throw error;
  }

  return conversation;
};

/**
 * =========================================================
 * SEND MESSAGE
 * =========================================================
 */
export const sendMessage = async ({
  conversationId,
  senderId,
  messageType = "text",
  content = "",
  clientMessageId,
}) => {
  // -----------------------------------------
  // 1. Validate IDs
  // -----------------------------------------
  validateObjectId(
    conversationId,
    "conversation ID"
  );

  validateObjectId(
    senderId,
    "sender ID"
  );

  // -----------------------------------------
  // 2. Validate clientMessageId
  // -----------------------------------------
  if (
    !clientMessageId ||
    !clientMessageId.trim()
  ) {
    const error = new Error(
      "clientMessageId is required"
    );

    error.statusCode = 400;
    throw error;
  }

  const normalizedClientMessageId =
    clientMessageId.trim();

  // -----------------------------------------
  // 3. Find conversation
  // -----------------------------------------
  const conversation =
    await Conversation.findById(
      conversationId
    );

  if (!conversation) {
    const error = new Error(
      "Conversation not found"
    );

    error.statusCode = 404;
    throw error;
  }

  // -----------------------------------------
  // 4. Check conversation status
  // -----------------------------------------
  if (
    conversation.status !== "active"
  ) {
    const error = new Error(
      `Cannot send message to a ${conversation.status} conversation`
    );

    error.statusCode = 403;
    throw error;
  }

  // -----------------------------------------
  // 5. Verify sender is participant
  // -----------------------------------------
  const isParticipant =
    conversation.participants.some(
      (participantId) =>
        participantId.toString() ===
        senderId.toString()
    );

  if (!isParticipant) {
    const error = new Error(
      "You are not a participant in this conversation"
    );

    error.statusCode = 403;
    throw error;
  }

  // -----------------------------------------
  // 6. Determine receiver
  // -----------------------------------------
  const receiverId =
    conversation.participants.find(
      (participantId) =>
        participantId.toString() !==
        senderId.toString()
    );

  if (!receiverId) {
    const error = new Error(
      "Unable to determine message receiver"
    );

    error.statusCode = 400;
    throw error;
  }

  // -----------------------------------------
  // 7. Validate message type
  // -----------------------------------------
  const allowedMessageTypes = [
    "text",
    "image",
    "file",
    "system",
  ];

  if (
    !allowedMessageTypes.includes(
      messageType
    )
  ) {
    const error = new Error(
      "Invalid message type"
    );

    error.statusCode = 400;
    throw error;
  }

  // -----------------------------------------
  // 8. Validate text content
  // -----------------------------------------
  if (messageType === "text") {
    if (
      !content ||
      !content.trim()
    ) {
      const error = new Error(
        "Message content is required"
      );

      error.statusCode = 400;
      throw error;
    }

    if (
      content.trim().length > 5000
    ) {
      const error = new Error(
        "Message cannot exceed 5000 characters"
      );

      error.statusCode = 400;
      throw error;
    }
  }

  // -----------------------------------------
  // 9. Idempotency check
  // -----------------------------------------
  const existingMessage =
    await Message.findOne({
      sender: senderId,
      clientMessageId:
        normalizedClientMessageId,
    });

  if (existingMessage) {
    const populatedMessage =
      await Message.findById(
        existingMessage._id
      )
        .populate(
          "sender",
          "name email profileImage"
        )
        .populate(
          "receiver",
          "name email profileImage"
        );

    return {
      message: populatedMessage,
      duplicate: true,
    };
  }

  // -----------------------------------------
  // 10. Create message
  // -----------------------------------------
  let message;

  try {
    message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      messageType,
      content:
        messageType === "text"
          ? content.trim()
          : content,
      clientMessageId:
        normalizedClientMessageId,
    });
  } catch (error) {
    // -----------------------------------------
    // Handle duplicate clientMessageId race
    // -----------------------------------------
    if (error.code === 11000) {
      const duplicateMessage =
        await Message.findOne({
          sender: senderId,
          clientMessageId:
            normalizedClientMessageId,
        })
          .populate(
            "sender",
            "name email profileImage"
          )
          .populate(
            "receiver",
            "name email profileImage"
          );

      return {
        message: duplicateMessage,
        duplicate: true,
      };
    }

    throw error;
  }

  // -----------------------------------------
  // 11. Update conversation metadata
  // -----------------------------------------
  conversation.lastMessage =
    message._id;

  conversation.lastMessageAt =
    message.sentAt;

  // -----------------------------------------
  // 12. Update receiver unread count
  // -----------------------------------------
  if (
    conversation.buyer.toString() ===
    receiverId.toString()
  ) {
    conversation.buyerUnreadCount += 1;
  }

  if (
    conversation.owner.toString() ===
    receiverId.toString()
  ) {
    conversation.ownerUnreadCount += 1;
  }

  await conversation.save();

  // -----------------------------------------
  // 13. Populate response
  // -----------------------------------------
  const populatedMessage =
    await Message.findById(
      message._id
    )
      .populate(
        "sender",
        "name email profileImage"
      )
      .populate(
        "receiver",
        "name email profileImage"
      );

  // -----------------------------------------
  // 14. Emit real-time message
  // -----------------------------------------
  emitNewMessage({
    conversationId:
      conversation._id.toString(),

    message:
      populatedMessage,
  });

  // -----------------------------------------
  // 15. Return response
  // -----------------------------------------
  return {
    message: populatedMessage,
    duplicate: false,
  };
};

/**
 * =========================================================
 * GET CONVERSATION MESSAGES
 *
 * Cursor-based pagination
 *
 * Query:
 * GET /conversations/:conversationId/messages
 *
 * Optional:
 * ?limit=30
 * ?before=<messageId>
 * =========================================================
 */
export const getConversationMessages = async ({
  conversationId,
  userId,
  limit = 30,
  before,
}) => {
  // -----------------------------------------
  // 1. Verify participant
  // -----------------------------------------
  await getConversationForParticipant({
    conversationId,
    userId,
  });

  // -----------------------------------------
  // 2. Validate limit
  // -----------------------------------------
  const parsedLimit = Math.min(
    Math.max(Number(limit) || 30, 1),
    100
  );

  // -----------------------------------------
  // 3. Build query
  // -----------------------------------------
  const query = {
    conversation: conversationId,
    deletedAt: null,
  };

  // -----------------------------------------
  // 4. Cursor pagination
  // -----------------------------------------
  if (before) {
    validateObjectId(
      before,
      "cursor message ID"
    );

    const cursorMessage =
      await Message.findOne({
        _id: before,
        conversation: conversationId,
      }).select("createdAt");

    if (!cursorMessage) {
      const error = new Error(
        "Invalid pagination cursor"
      );

      error.statusCode = 400;
      throw error;
    }

    query.createdAt = {
      $lt: cursorMessage.createdAt,
    };
  }

  // -----------------------------------------
  // 5. Fetch messages
  // -----------------------------------------
  const messages =
    await Message.find(query)
      .sort({
        createdAt: -1,
      })
      .limit(parsedLimit + 1)
      .populate(
        "sender",
        "name email profileImage"
      )
      .populate(
        "receiver",
        "name email profileImage"
      )
      .lean();

  // -----------------------------------------
  // 6. Determine next page
  // -----------------------------------------
  const hasMore =
    messages.length > parsedLimit;

  if (hasMore) {
    messages.pop();
  }

  // -----------------------------------------
  // 7. Reverse for chronological order
  // -----------------------------------------
  messages.reverse();

  const nextCursor = hasMore
  ? messages[0]?._id
  : null;

  return {
    messages,
    pagination: {
      limit: parsedLimit,
      hasMore,
      nextCursor,
    },
  };
};

/**
 * =========================================================
 * MARK MESSAGE AS DELIVERED
 *
 * Used when recipient receives message.
 * =========================================================
 */
export const markMessagesAsDelivered = async ({
  conversationId,
  userId,
}) => {
  const conversation =
    await getConversationForParticipant({
      conversationId,
      userId,
    });

  const messages =
    await Message.find({
      conversation: conversation._id,
      receiver: userId,
      status: "sent",
      deletedAt: null,
    }).select("_id");

  const messageIds = messages.map(
    (message) => message._id.toString()
  );

  if (messageIds.length > 0) {
    await Message.updateMany(
      {
        _id: {
          $in: messageIds,
        },
      },
      {
        $set: {
          status: "delivered",
          deliveredAt: new Date(),
        },
      }
    );

    emitMessageDelivered({
      conversationId:
        conversation._id.toString(),

      messageIds,
    });
  }

  return {
    modifiedCount: messageIds.length,
  };
};

/**
 * =========================================================
 * MARK MESSAGE AS READ
 *
 * Used when user opens/views conversation.
 * =========================================================
 */
export const markMessagesAsRead = async ({
  conversationId,
  userId,
}) => {
  const conversation =
    await getConversationForParticipant({
      conversationId,
      userId,
    });

  // -----------------------------------------
  // 1. Find unread messages
  // -----------------------------------------
  const messages =
    await Message.find({
      conversation: conversation._id,
      receiver: userId,
      status: {
        $in: ["sent", "delivered"],
      },
      deletedAt: null,
    }).select("_id");

  const messageIds = messages.map(
    (message) => message._id.toString()
  );

  // -----------------------------------------
  // 2. Mark messages as read
  // -----------------------------------------
  if (messageIds.length > 0) {
    await Message.updateMany(
      {
        _id: {
          $in: messageIds,
        },
      },
      {
        $set: {
          status: "read",
          readAt: new Date(),
        },
      }
    );
  }

  // -----------------------------------------
  // 3. Reset correct unread counter
  // -----------------------------------------
  if (
    conversation.buyer.toString() ===
    userId.toString()
  ) {
    conversation.buyerUnreadCount = 0;
  }

  if (
    conversation.owner.toString() ===
    userId.toString()
  ) {
    conversation.ownerUnreadCount = 0;
  }

  await conversation.save();

  // -----------------------------------------
  // 4. Emit real-time read event
  // -----------------------------------------
  if (messageIds.length > 0) {
    emitMessageRead({
      conversationId:
        conversation._id.toString(),

      messageIds,
    });
  }

  return {
    modifiedCount: messageIds.length,
  };
};


/**
 * =========================================================
 * DELETE MESSAGE
 *
 * Soft deletes a message.
 *
 * Rules:
 * - Only the sender can delete the message.
 * - Message is not physically removed from database.
 * - deletedAt is populated instead.
 * - Deleted messages are excluded from normal history.
 * - If deleted message is the conversation's last message,
 *   the conversation metadata is recalculated.
 * =========================================================
 */
export const deleteMessage = async ({
  conversationId,
  messageId,
  userId,
}) => {
  // -----------------------------------------
  // 1. Validate IDs
  // -----------------------------------------
  validateObjectId(
    conversationId,
    "conversation ID"
  );

  validateObjectId(
    messageId,
    "message ID"
  );

  validateObjectId(
    userId,
    "user ID"
  );

  // -----------------------------------------
  // 2. Verify conversation participant
  // -----------------------------------------
  const conversation =
    await getConversationForParticipant({
      conversationId,
      userId,
    });

  // -----------------------------------------
  // 3. Find message
  // -----------------------------------------
  const message =
    await Message.findOne({
      _id: messageId,
      conversation: conversation._id,
    });

  if (!message) {
    const error = new Error(
      "Message not found"
    );

    error.statusCode = 404;
    throw error;
  }

  // -----------------------------------------
  // 4. Only sender can delete message
  // -----------------------------------------
  if (
    message.sender.toString() !==
    userId.toString()
  ) {
    const error = new Error(
      "You can only delete your own messages"
    );

    error.statusCode = 403;
    throw error;
  }

  // -----------------------------------------
  // 5. Check if already deleted
  // -----------------------------------------
  if (message.deletedAt) {
    const error = new Error(
      "Message has already been deleted"
    );

    error.statusCode = 400;
    throw error;
  }

  // -----------------------------------------
// 6. Soft delete message
// -----------------------------------------
message.deletedAt = new Date();

await message.save();

// -----------------------------------------
// 6.1 Notify connected participants
// -----------------------------------------
emitMessageDeleted({
  conversationId:
    conversation._id.toString(),

  messageId:
    message._id.toString(),

  deletedAt:
    message.deletedAt,
});
  // -----------------------------------------
  // 7. Check if deleted message was
  //    the conversation's last message
  // -----------------------------------------
  if (
    conversation.lastMessage &&
    conversation.lastMessage.toString() ===
      message._id.toString()
  ) {
    // Find latest remaining message
    const latestMessage =
      await Message.findOne({
        conversation: conversation._id,
        deletedAt: null,
      })
        .sort({
          createdAt: -1,
        })
        .select(
          "_id sentAt sender receiver messageType content"
        );

    if (latestMessage) {
      conversation.lastMessage =
        latestMessage._id;

      conversation.lastMessageAt =
        latestMessage.sentAt;
    } else {
      // No messages remain
      conversation.lastMessage = null;
      conversation.lastMessageAt = null;
    }

    await conversation.save();
  }

  return {
    messageId: message._id,
    deletedAt: message.deletedAt,
  };
};