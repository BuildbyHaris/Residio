
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getConversationById,
    getConversationMessages,
    sendMessage,
    markMessagesAsRead,
} from "../services/chat.service";

import socket from "../socket/socket";

import { ArrowLeft, Send } from "lucide-react";

const ChatPage = () => {
    const {
        conversationId,
    } = useParams();

    const navigate =
        useNavigate();

    // =========================================================
    // STATE
    // =========================================================

    const [
        conversation,
        setConversation,
    ] = useState(null);

    const [
        messages,
        setMessages,
    ] = useState([]);

    const [
        messageText,
        setMessageText,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        sending,
        setSending,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState(null);

    // =========================================================
    // REFS
    // =========================================================

    const messagesEndRef =
        useRef(null);

    const inputRef =
        useRef(null);

    // =========================================================
    // SCROLL TO BOTTOM
    // =========================================================

    const scrollToBottom =
        useCallback(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }, []);

    // =========================================================
    // LOAD CONVERSATION + MESSAGES
    // =========================================================

    useEffect(() => {
        const loadChat = async () => {
            try {
                setLoading(true);
                setError(null);

                // ---------------------------------------------
                // Get conversation
                // ---------------------------------------------

                const conversationResponse =
                    await getConversationById(
                        conversationId
                    );

                // ---------------------------------------------
                // Get messages
                // ---------------------------------------------

                const messagesResponse =
                    await getConversationMessages(
                        conversationId
                    );

                // ---------------------------------------------
                // Save conversation
                // ---------------------------------------------

                setConversation(
                    conversationResponse
                        ?.data
                        ?.conversation || null
                );

                // ---------------------------------------------
                // Save messages
                // ---------------------------------------------

                setMessages(
                    messagesResponse
                        ?.data
                        ?.messages || []
                );

                // ---------------------------------------------
                // Mark messages as read
                // ---------------------------------------------

                try {
                    await markMessagesAsRead(
                        conversationId
                    );
                } catch (readError) {
                    console.error(
                        "Failed to mark messages as read:",
                        readError
                    );
                }

            } catch (error) {
                console.error(
                    "Failed to load chat:",
                    error
                );

                setError(
                    error?.response
                        ?.data
                        ?.message ||
                    "Unable to load conversation"
                );
            } finally {
                setLoading(false);
            }
        };

        if (conversationId) {
            loadChat();
        }
    }, [
        conversationId,
    ]);

    // =========================================================
    // AUTO SCROLL WHEN MESSAGES CHANGE
    // =========================================================

    useEffect(() => {
        if (!loading) {
            scrollToBottom();
        }
    }, [
        messages,
        loading,
        scrollToBottom,
    ]);

    // =========================================================
    // SOCKET.IO
    // =========================================================

    useEffect(() => {
        if (!conversationId) {
            return;
        }

        // ---------------------------------------------
        // Join conversation room
        // ---------------------------------------------

        const joinConversation = () => {
            console.log(
                "Joining conversation:",
                conversationId
            );

            socket.emit(
                "join_conversation",
                {
                    conversationId,
                }
            );
        };

        // ---------------------------------------------
        // Conversation joined
        // ---------------------------------------------

        const handleConversationJoined =
            (data) => {
                console.log(
                    "Conversation joined:",
                    data
                );
            };

        // ---------------------------------------------
        // Receive new message
        // ---------------------------------------------

        const handleNewMessage =
            (newMessage) => {
                console.log(
                    "New message received:",
                    newMessage
                );

                setMessages(
                    (currentMessages) => {

                        // Prevent duplicate messages
                        const alreadyExists =
                            currentMessages.some(
                                (message) =>
                                    message._id ===
                                    newMessage._id
                            );

                        if (
                            alreadyExists
                        ) {
                            return currentMessages;
                        }

                        return [
                            ...currentMessages,
                            newMessage,
                        ];
                    }
                );
            };

        // ---------------------------------------------
        // Socket error
        // ---------------------------------------------

        const handleSocketError =
            (data) => {
                console.error(
                    "Socket error:",
                    data
                );
            };

        // ---------------------------------------------
        // Register listeners
        // ---------------------------------------------

        socket.on(
            "conversation_joined",
            handleConversationJoined
        );

        socket.on(
            "new_message",
            handleNewMessage
        );

        socket.on(
            "socket_error",
            handleSocketError
        );

        // ---------------------------------------------
        // Join immediately if connected
        // ---------------------------------------------

        if (socket.connected) {
            joinConversation();
        }

        // ---------------------------------------------
        // Join when socket connects
        // ---------------------------------------------

        socket.on(
            "connect",
            joinConversation
        );

        // ---------------------------------------------
        // Cleanup
        // ---------------------------------------------

        return () => {
            if (socket.connected) {
                socket.emit(
                    "leave_conversation",
                    {
                        conversationId,
                    }
                );
            }

            socket.off(
                "connect",
                joinConversation
            );

            socket.off(
                "conversation_joined",
                handleConversationJoined
            );

            socket.off(
                "new_message",
                handleNewMessage
            );

            socket.off(
                "socket_error",
                handleSocketError
            );
        };
    }, [
        conversationId,
    ]);

    // =========================================================
    // SEND MESSAGE
    // =========================================================

    const handleSendMessage =
        async (event) => {
            event?.preventDefault();

            const content =
                messageText.trim();

            // ---------------------------------------------
            // Prevent empty messages
            // ---------------------------------------------

            if (
                !content ||
                !conversationId ||
                sending
            ) {
                return;
            }

            try {
                setSending(true);

                // ---------------------------------------------
                // Send message to backend
                //
                // IMPORTANT:
                // This assumes your backend expects:
                //
                // {
                //   conversationId,
                //   content
                // }
                // ---------------------------------------------

                const response = await sendMessage({ conversationId, content, clientMessageId: crypto.randomUUID(), });

                const newMessage =
                    response
                        ?.data
                        ?.message;

                // ---------------------------------------------
                // Add message immediately
                //
                // Socket may also send this message back.
                // Our duplicate check prevents duplicates.
                // ---------------------------------------------

                if (newMessage) {
                    setMessages(
                        (currentMessages) => {

                            const alreadyExists =
                                currentMessages.some(
                                    (message) =>
                                        message._id ===
                                        newMessage._id
                                );

                            if (
                                alreadyExists
                            ) {
                                return currentMessages;
                            }

                            return [
                                ...currentMessages,
                                newMessage,
                            ];
                        }
                    );
                }

                // ---------------------------------------------
                // Clear input
                // ---------------------------------------------

                setMessageText("");

                // ---------------------------------------------
                // Focus input
                // ---------------------------------------------

                inputRef.current?.focus();

            } catch (error) {
                console.error(
                    "Failed to send message:",
                    error
                );

                alert(
                    error?.response
                        ?.data
                        ?.message ||
                    "Failed to send message"
                );
            } finally {
                setSending(false);
            }
        };

    // =========================================================
    // ENTER KEY HANDLER
    // =========================================================

    const handleKeyDown =
        (event) => {
            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {
                event.preventDefault();

                handleSendMessage(
                    event
                );
            }
        };

    // =========================================================
    // LOADING STATE
    // =========================================================

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500">
                    Loading chat...
                </div>
            </div>
        );
    }

    // =========================================================
    // ERROR STATE
    // =========================================================

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="px-4 py-2 bg-[#F5732C] text-white rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // =========================================================
    // CHAT PAGE
    // =========================================================

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="w-full max-w-4xl h-[700px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">

                {/* =================================================
            HEADER
        ================================================== */}

                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <div className="flex-1">

                        <h1 className="text-lg font-semibold text-gray-900">
                            {conversation
                                ?.hostel
                                ?.name ||
                                "Property Chat"}
                        </h1>

                        <p className="text-sm text-gray-500">
                            Chat with property owner
                        </p>

                    </div>

                </div>

                {/* =================================================
            MESSAGES
        ================================================== */}

                <div className="flex-1 overflow-y-auto p-6">

                    {messages.length ===
                        0 ? (

                        <div className="h-full flex items-center justify-center text-gray-400">
                            No messages yet.
                            Start the conversation.
                        </div>

                    ) : (

                        <div className="space-y-4">

                            {messages.map(
                                (message) => {

                                    /*
                                     * Adjust this according to your
                                     * actual Message model response.
                                     *
                                     * Common possibilities:
                                     *
                                     * message.sender._id
                                     * message.senderId
                                     * message.sender
                                     */

                                    const senderId =
                                        message
                                            ?.sender
                                            ?._id ||
                                        message
                                            ?.senderId;

                                    const currentUserId =
                                        conversation
                                            ?.currentUserId;

                                    const isOwnMessage =
                                        currentUserId &&
                                        senderId &&
                                        String(
                                            senderId
                                        ) ===
                                        String(
                                            currentUserId
                                        );

                                    return (
                                        <div
                                            key={
                                                message._id
                                            }
                                            className={`flex ${isOwnMessage
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >

                                            <div
                                                className={`max-w-[70%] px-4 py-3 rounded-2xl ${isOwnMessage
                                                        ? "bg-[#F5732C] text-white rounded-br-md"
                                                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                                                    }`}
                                            >

                                                <p className="text-sm whitespace-pre-wrap break-words">
                                                    {message.content}
                                                </p>

                                                {message.createdAt && (
                                                    <p
                                                        className={`text-[10px] mt-1 ${isOwnMessage
                                                                ? "text-white/70"
                                                                : "text-gray-400"
                                                            }`}
                                                    >
                                                        {new Date(
                                                            message.createdAt
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute:
                                                                    "2-digit",
                                                            }
                                                        )}
                                                    </p>
                                                )}

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                            <div
                                ref={
                                    messagesEndRef
                                }
                            />

                        </div>

                    )}

                </div>

                {/* =================================================
            MESSAGE INPUT
        ================================================== */}

                <form
                    onSubmit={
                        handleSendMessage
                    }
                    className="border-t border-gray-200 p-4"
                >

                    <div className="flex items-center gap-3">

                        <input
                            ref={inputRef}
                            type="text"
                            value={
                                messageText
                            }
                            onChange={(event) =>
                                setMessageText(
                                    event.target.value
                                )
                            }
                            onKeyDown={
                                handleKeyDown
                            }
                            placeholder="Type a message..."
                            disabled={sending}
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#F5732C] focus:ring-1 focus:ring-[#F5732C] disabled:bg-gray-100"
                        />

                        <button
                            type="submit"
                            disabled={
                                sending ||
                                !messageText.trim()
                            }
                            className="w-12 h-12 flex items-center justify-center bg-[#F5732C] hover:bg-[#E5631D] text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            <Send className="w-5 h-5" />

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ChatPage;
