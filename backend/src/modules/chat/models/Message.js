import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    mimeType: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file", "system"],
      default: "text",
      required: true,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    attachment: {
      type: attachmentSchema,
      default: null,
    },

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    readAt: {
      type: Date,
      default: null,
    },

    /**
     * Client-generated unique ID.
     * Used to prevent duplicate messages
     * when the client retries a request.
     */
    clientMessageId: {
      type: String,
      required: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Efficient cursor-based message pagination.
 */
messageSchema.index({
  conversation: 1,
  createdAt: -1,
});

/**
 * Fast lookup of unread messages.
 */
messageSchema.index({
  conversation: 1,
  receiver: 1,
  status: 1,
});

/**
 * Prevent duplicate messages caused by retries.
 */
messageSchema.index(
  {
    sender: 1,
    clientMessageId: 1,
  },
  {
    unique: true,
  }
);

const Message = mongoose.model(
  "Message",
  messageSchema
);

export default Message;