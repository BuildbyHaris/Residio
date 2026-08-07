import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import User from "../../auth/models/User.js";
import Hostel from "../../ownerDashboard/models/hostel.model.js";
import Message from "../models/Message.js";

// ============================================================
// CREATE OR GET PROPERTY CONVERSATION
// ============================================================

export const createOrGetPropertyConversation = async ({
  userId,
  hostelId,
}) => {
  // ==========================================
  // 1. Validate IDs
  // ==========================================

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }

  if (!mongoose.Types.ObjectId.isValid(hostelId)) {
    throw new Error("Invalid hostel ID");
  }

  // ==========================================
  // 2. Find authenticated user
  // ==========================================

  const buyer = await User.findById(userId).select(
    "_id name email role profileImage"
  );

  if (!buyer) {
    throw new Error("User not found");
  }

  // ==========================================
  // 3. Find hostel
  // ==========================================

  const hostel = await Hostel.findById(hostelId).select(
    "_id owner name city address images status"
  );

  if (!hostel) {
    throw new Error("Hostel not found");
  }

  // ==========================================
  // 4. Validate hostel owner
  // ==========================================

  if (!hostel.owner) {
    throw new Error("Hostel owner not found");
  }

  const ownerId = hostel.owner.toString();
  const buyerId = buyer._id.toString();

  // ==========================================
  // 5. Prevent owner from messaging himself
  // ==========================================

  if (ownerId === buyerId) {
    throw new Error(
      "You cannot start a conversation with yourself"
    );
  }

  // ==========================================
  // 6. Verify authenticated user is a buyer
  // ==========================================

  if (buyer.role !== "buyer") {
    throw new Error(
      "Only buyers can start property inquiry conversations"
    );
  }

  // ==========================================
  // 7. Check if conversation already exists
  // ==========================================

  const existingConversation =
    await Conversation.findOne({
      type: "property_inquiry",
      hostel: hostel._id,
      buyer: buyer._id,
      owner: hostel.owner,
    })
      .populate(
        "buyer",
        "_id name email role profileImage"
      )
      .populate(
        "owner",
        "_id name email role profileImage"
      )
      .populate(
        "hostel",
        "_id name city address images owner"
      )
      .populate(
        "lastMessage"
      );

  // ==========================================
  // 8. Return existing conversation
  // ==========================================

  if (existingConversation) {
    return {
      conversation: existingConversation,
      created: false,
    };
  }

  // ==========================================
  // 9. Create new conversation
  // ==========================================

  let conversation;

  try {
    conversation = await Conversation.create({
      type: "property_inquiry",

      hostel: hostel._id,

      buyer: buyer._id,

      owner: hostel.owner,

      participants: [
        buyer._id,
        hostel.owner,
      ],

      lastMessage: null,

      lastMessageAt: null,

      buyerUnreadCount: 0,

      ownerUnreadCount: 0,

      status: "active",
    });
  } catch (error) {
    // MongoDB duplicate key error
    // This can happen if two requests create
    // the same conversation simultaneously.

    if (error.code === 11000) {
      const existingConversation =
        await Conversation.findOne({
          type: "property_inquiry",
          hostel: hostel._id,
          buyer: buyer._id,
          owner: hostel.owner,
        })
          .populate(
            "buyer",
            "_id name email role profileImage"
          )
          .populate(
            "owner",
            "_id name email role profileImage"
          )
          .populate(
            "hostel",
            "_id name city address images owner"
          )
          .populate(
            "lastMessage"
          );

      if (existingConversation) {
        return {
          conversation: existingConversation,
          created: false,
        };
      }
    }

    throw error;
  }

  // ==========================================
  // 10. Fetch populated conversation
  // ==========================================

  const populatedConversation =
    await Conversation.findById(
      conversation._id
    )
      .populate(
        "buyer",
        "_id name email role profileImage"
      )
      .populate(
        "owner",
        "_id name email role profileImage"
      )
      .populate(
        "hostel",
        "_id name city address images owner"
      )
      .populate(
        "lastMessage"
      );

  return {
    conversation: populatedConversation,
    created: true,
  };
};

// ============================================================
// GET USER CONVERSATIONS
// ============================================================

export const getUserConversations = async ({
  userId,
  cursor = null,
  limit = 20,
}) => {
  // ==========================================
  // 1. Validate user ID
  // ==========================================

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  // ==========================================
  // 2. Validate and sanitize limit
  // ==========================================

  const parsedLimit = Number(limit);

  const safeLimit =
    Number.isInteger(parsedLimit) &&
    parsedLimit > 0 &&
    parsedLimit <= 50
      ? parsedLimit
      : 20;

  // ==========================================
  // 3. Base query
  // ==========================================

  const query = {
    participants: userId,
  };

  // ==========================================
  // 4. Cursor validation
  // ==========================================

  if (cursor) {
    if (!mongoose.Types.ObjectId.isValid(cursor)) {
      const error = new Error("Invalid cursor");
      error.statusCode = 400;
      throw error;
    }

    // Find the conversation represented by cursor
    const cursorConversation =
      await Conversation.findById(cursor).select(
        "_id lastMessageAt"
      );

    if (!cursorConversation) {
      const error = new Error("Invalid cursor");
      error.statusCode = 400;
      throw error;
    }

    // ==========================================
    // Conversations with messages
    // ==========================================

    if (cursorConversation.lastMessageAt) {
      query.$or = [
        {
          lastMessageAt: {
            $lt: cursorConversation.lastMessageAt,
          },
        },
        {
          lastMessageAt:
            cursorConversation.lastMessageAt,

          _id: {
            $lt: cursorConversation._id,
          },
        },
      ];
    }

    // ==========================================
    // Conversations without messages
    // ==========================================

    else {
      query.lastMessageAt = null;

      query._id = {
        $lt: cursorConversation._id,
      };
    }
  }

  // ==========================================
  // 5. Fetch conversations
  // ==========================================

  const conversations =
    await Conversation.find(query)
      .sort({
        lastMessageAt: -1,
        _id: -1,
      })
      .limit(safeLimit + 1)

      // Hostel information
      .populate(
        "hostel",
        "_id name address city images"
      )

      // Buyer information
      .populate(
        "buyer",
        "_id name email role profileImage"
      )

      // Owner information
      .populate(
        "owner",
        "_id name email role profileImage"
      )

      // Last message preview
      .populate({
        path: "lastMessage",
        select:
          "_id sender receiver messageType content status sentAt createdAt",
      })

      .lean();

  // ==========================================
  // 6. Determine whether more conversations exist
  // ==========================================

  const hasMore =
    conversations.length > safeLimit;

  // Remove extra record used to detect hasMore
  if (hasMore) {
    conversations.pop();
  }

  // ==========================================
  // 7. Generate next cursor
  // ==========================================

  const nextCursor =
    hasMore && conversations.length > 0
      ? conversations[
          conversations.length - 1
        ]._id
      : null;

  // ==========================================
  // 8. Return result
  // ==========================================

  return {
    conversations,

    pagination: {
      limit: safeLimit,
      hasMore,
      nextCursor,
    },
  };
};

export const getConversationById = async ({
  conversationId,
  userId,
}) => {
  // ==========================================
  // 1. Validate conversation ID
  // ==========================================

  if (
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    const error = new Error(
      "Invalid conversation ID"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // 2. Validate user ID
  // ==========================================

  if (
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    const error = new Error(
      "Invalid user ID"
    );

    error.statusCode = 400;

    throw error;
  }

  // ==========================================
  // 3. Find conversation
  // ==========================================

  const conversation =
    await Conversation.findById(
      conversationId
    )
      .populate(
        "buyer",
        "_id name email role profileImage"
      )
      .populate(
        "owner",
        "_id name email role profileImage"
      )
      .populate(
        "hostel",
        "_id owner name city address images status"
      )
      .populate({
        path: "lastMessage",
        select:
          "_id sender receiver messageType content status sentAt createdAt",
      });

  // ==========================================
  // 4. Conversation not found
  // ==========================================

  if (!conversation) {
    const error = new Error(
      "Conversation not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // ==========================================
  // 5. Verify user is a participant
  // ==========================================

  const isParticipant =
    conversation.participants.some(
      (participantId) =>
        participantId.toString() ===
        userId.toString()
    );

  if (!isParticipant) {
    const error = new Error(
      "You are not authorized to access this conversation"
    );

    error.statusCode = 403;

    throw error;
  }

  // ==========================================
  // 6. Return conversation
  // ==========================================

  return conversation;
};