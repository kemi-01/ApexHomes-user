import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Send,
  User,
  MapPin,
  Star,
  ArrowRight,
  Loader2,
} from "lucide-react";

import api from "../services/api";

const AI = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Apex AI 👋 Tell me what kind of stay you're looking for. You can give me a location, property type, budget, number of guests, or just ask me a question.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  /*
   * =========================================================
   * ADD MESSAGE
   * =========================================================
   */

  const addMessage = (newMessage) => {
    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-${Math.random()}`,
        ...newMessage,
      },
    ]);
  };

  /*
   * =========================================================
   * SEND MESSAGE TO BACKEND
   * =========================================================
   */

  const sendMessage = async (text) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    addMessage({
      role: "user",
      content: trimmedMessage,
    });

    setMessage("");
    setLoading(true);

    try {
      /*
       * Send the previous conversation to the backend.
       *
       * The backend currently doesn't use conversation yet,
       * but sending it now makes the frontend ready for
       * conversational memory later.
       */

      const conversation = messages.map((item) => ({
        role: item.role,
        content: item.content,
      }));

      const response = await api.post("/ai/chat", {
        message: trimmedMessage,
        conversation,
      });

      const data = response?.data;

      /*
       * Backend response:
       *
       * {
       *   success: true,
       *   message: "...",
       *   response: "...",
       *   properties: []
       * }
       */

      const assistantMessage =
        data?.message ||
        data?.response ||
        "I couldn't process that request right now.";

      const recommendedProperties =
        Array.isArray(data?.properties)
          ? data.properties
          : [];

      addMessage({
        role: "assistant",
        content: assistantMessage,
        properties: recommendedProperties,
      });
    } catch (error) {
      console.error("Apex AI error:", error);

      /*
       * Try to show a useful backend error if one exists.
       */

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error;

      addMessage({
        role: "assistant",
        content:
          backendMessage ||
          "I couldn't search the ApexHomes properties right now. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * FORM SUBMIT
   * =========================================================
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendMessage(message);
  };

  /*
   * =========================================================
   * SUGGESTION
   * =========================================================
   */

  const handleSuggestion = async (suggestion) => {
    if (loading) {
      return;
    }

    setMessage(suggestion);

    await sendMessage(suggestion);
  };

  /*
   * =========================================================
   * PROPERTY CARD
   * =========================================================
   */

  const PropertyRecommendation = ({ property }) => {
    const id =
      property?._id ||
      property?.id;

    const image =
      property?.images?.[0]?.url ||
      property?.images?.[0] ||
      property?.image ||
      "/placeholder-property.jpg";

    const title =
      property?.title ||
      property?.name ||
      "ApexHomes Property";

    const city =
      property?.location?.city ||
      property?.city ||
      "";

    const country =
      property?.location?.country ||
      property?.country ||
      "";

    const location =
      [city, country]
        .filter(Boolean)
        .join(", ") ||
      "Location unavailable";

    const price = Number(
      property?.price ??
        property?.pricePerNight ??
        property?.pricing?.nightlyRate ??
        0
    );

    const currency =
      property?.currency ||
      "NGN";

    const priceUnit =
      property?.priceUnit ||
      "night";

    const rating =
      property?.rating ??
      property?.averageRating;

    const propertyType =
      property?.propertyType ||
      property?.type ||
      "";

    if (!id) {
      return null;
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* IMAGE */}

        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover"
          onError={(event) => {
            event.currentTarget.src =
              "/placeholder-property.jpg";
          }}
        />

        {/* CONTENT */}

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-950">
                {title}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={13} />

                <span className="truncate">
                  {location}
                </span>
              </div>
            </div>

            {/* RATING */}

            {rating !== null &&
              rating !== undefined &&
              rating !== "" && (
                <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-700">
                  <Star
                    size={13}
                    className="fill-current"
                  />

                  {Number(rating).toFixed(1)}
                </div>
              )}
          </div>

          {/* PRICE */}

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              {propertyType && (
                <p className="mb-1 text-[11px] capitalize text-gray-400">
                  {propertyType}
                </p>
              )}

              <p className="text-base font-bold text-gray-950">
                {currency === "NGN"
                  ? "₦"
                  : currency}{" "}
                {price.toLocaleString()}
                <span className="ml-1 text-xs font-normal text-gray-400">
                  / {priceUnit}
                </span>
              </p>
            </div>

            {/* VIEW PROPERTY */}

            <Link
              to={`/properties/${id}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
            >
              View property

              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  /*
   * =========================================================
   * SUGGESTIONS
   * =========================================================
   */

  const suggestions = [
    "Find me a villa in Lagos",
    "Show me apartments in Abuja",
    "Find a place under ₦100,000",
    "I need a romantic place for two",
  ];

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-white">
            <Sparkles size={22} />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-950">
            Apex AI
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Your personal stay assistant
          </p>
        </div>

        {/* =====================================================
            CHAT CONTAINER
        ===================================================== */}

        <div className="flex min-h-[600px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* ===================================================
              MESSAGES
          =================================================== */}

          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
            {messages.map((item) => {
              const isUser =
                item.role === "user";

              return (
                <div
                  key={item.id}
                  className={`flex gap-3 ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* AI AVATAR */}

                  {!isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white">
                      <Sparkles size={16} />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] ${
                      isUser
                        ? "sm:max-w-[75%]"
                        : "sm:max-w-[85%]"
                    }`}
                  >
                    {/* MESSAGE */}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? "rounded-br-md bg-gray-950 text-white"
                          : "rounded-bl-md bg-gray-100 text-gray-900"
                      }`}
                    >
                      {item.content}
                    </div>

                    {/* =================================================
                        PROPERTY RECOMMENDATIONS
                    ================================================= */}

                    {!isUser &&
                      Array.isArray(
                        item.properties
                      ) &&
                      item.properties.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <p className="px-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Recommended stays
                          </p>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {item.properties
                              .slice(0, 6)
                              .map(
                                (property) => (
                                  <PropertyRecommendation
                                    key={
                                      property?._id ||
                                      property?.id
                                    }
                                    property={
                                      property
                                    }
                                  />
                                )
                              )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* USER AVATAR */}

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-white">
                  <Sparkles size={16} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-500">
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  Searching ApexHomes...
                </div>
              </div>
            )}
          </div>

          {/* =====================================================
              SUGGESTIONS
          ===================================================== */}

          {messages.length === 1 && (
            <div className="border-t border-gray-100 px-4 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Try asking
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleSuggestion(
                          suggestion
                        )
                      }
                      className="rounded-xl border border-gray-200 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* =====================================================
              INPUT
          ===================================================== */}

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 p-4"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-gray-400">

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                      "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    handleSubmit(event);
                  }
                }}
                placeholder="Ask Apex anything..."
                rows={1}
                disabled={loading}
                className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={
                  !message.trim() ||
                  loading
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AI;