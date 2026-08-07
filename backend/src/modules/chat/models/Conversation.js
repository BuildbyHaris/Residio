import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["property_inquiry", "support", "admin"],
      default: "property_inquiry",
      required: true,
    },

    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: function () {
        return this.type === "property_inquiry";
      },
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "property_inquiry";
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.type === "property_inquiry";
      },
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    buyerUnreadCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    ownerUnreadCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "archived", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate property conversations
 * between the same buyer and owner.
 */
conversationSchema.index(
  {
    type: 1,
    hostel: 1,
    buyer: 1,
    owner: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      type: "property_inquiry",
    },
  }
);

/**
 * Fast lookup of conversations for a user.
 */
conversationSchema.index({
  participants: 1,
  lastMessageAt: -1,
  _id: -1,
});

/**
 * Fast lookup by property.
 */
conversationSchema.index({
  hostel: 1,
  createdAt: -1,
});

const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;