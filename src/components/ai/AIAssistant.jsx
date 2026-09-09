import { useState } from "react";
import {
  Sparkles,
  X,
  Minimize2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AIChat from "./AIChat";
import AIInput from "./AIInput";
import AISuggestions from "./AISuggestions";

const PROPERTY_TYPES = [
  "apartment",
  "house",
  "condo",
  "villa",
  "hotel",
  "resort",
  "cabin",
];

const AIAssistant = ({
  properties = [],
  onPropertySelect,
  onSearch,
  position = "bottom-right",
}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] =
    useState(false);

  const [isMinimized, setIsMinimized] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi 👋 I'm Apex, your ApexHomes travel assistant. Tell me where you want to stay, your budget, dates, or the kind of place you're looking for and I'll help you find it.",
        timestamp: new Date(),
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  const positionClasses = {
    "bottom-right":
      "bottom-6 right-6",

    "bottom-left":
      "bottom-6 left-6",
  };

  /*
   * --------------------------------------------------
   * ADD MESSAGE
   * --------------------------------------------------
   */

  const addMessage = (message) => {
    setMessages((previous) => [
      ...previous,
      {
        ...message,
        id:
          message.id ||
          `${Date.now()}-${Math.random()}`,
        timestamp:
          message.timestamp ||
          new Date(),
      },
    ]);
  };

  /*
   * --------------------------------------------------
   * NORMALIZE PROPERTY
   * --------------------------------------------------
   */

  const getPropertyType = (property) => {
    return String(
      property?.propertyType ||
        property?.type ||
        ""
    )
      .trim()
      .toLowerCase();
  };

  const getPropertyLocation = (
    property
  ) => {
    return [
      property?.city,
      property?.state,
      property?.country,
      property?.location?.city,
      property?.location?.state,
      property?.location?.country,
      property?.address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  };

  const getPropertyPrice = (
    property
  ) => {
    return Number(
      property?.pricePerNight ??
        property?.price ??
        property?.pricing
          ?.nightlyRate ??
        0
    );
  };

  const getBedrooms = (property) => {
    return Number(
      property?.bedrooms ??
        property?.rooms ??
        0
    );
  };

  const getGuests = (property) => {
    return Number(
      property?.guests ??
        property?.maxGuests ??
        property?.guestCapacity ??
        0
    );
  };

  /*
   * --------------------------------------------------
   * FIND PROPERTY TYPE
   * --------------------------------------------------
   */

  const detectPropertyType = (text) => {
    const normalized =
      text.toLowerCase();

    const aliases = {
      apartment: [
        "apartment",
        "apartments",
        "flat",
        "flats",
      ],

      house: [
        "house",
        "houses",
        "home",
        "homes",
      ],

      condo: [
        "condo",
        "condos",
        "condominium",
        "condominiums",
      ],

      villa: [
        "villa",
        "villas",
      ],

      hotel: [
        "hotel",
        "hotels",
      ],

      resort: [
        "resort",
        "resorts",
      ],

      cabin: [
        "cabin",
        "cabins",
      ],
    };

    for (const [
      type,
      words,
    ] of Object.entries(aliases)) {
      if (
        words.some((word) =>
          normalized.includes(word)
        )
      ) {
        return type;
      }
    }

    return "";
  };

  /*
   * --------------------------------------------------
   * FIND LOCATION
   * --------------------------------------------------
   */

  const detectLocation = (text) => {
    const normalized =
      text.toLowerCase();

    /*
     * First check actual property
     * locations.
     *
     * This means if your database
     * contains Lagos, Port Harcourt,
     * Abuja, etc., Apex can recognize
     * those locations automatically.
     */

    const possibleLocations =
      new Set();

    properties.forEach(
      (property) => {
        const locations = [
          property?.city,
          property?.state,
          property?.country,
          property?.location?.city,
          property?.location?.state,
          property?.location?.country,
        ];

        locations.forEach(
          (location) => {
            if (location) {
              possibleLocations.add(
                String(location)
                  .trim()
                  .toLowerCase()
              );
            }
          }
        );
      }
    );

    const sortedLocations =
      [...possibleLocations].sort(
        (a, b) =>
          b.length - a.length
      );

    const foundLocation =
      sortedLocations.find(
        (location) =>
          location.length > 2 &&
          normalized.includes(location)
      );

    return foundLocation || "";
  };

  /*
   * --------------------------------------------------
   * FIND BUDGET
   * --------------------------------------------------
   */

  const detectBudget = (text) => {
    const normalized =
      text
        .toLowerCase()
        .replace(/,/g, "");

    /*
     * Examples:
     *
     * ₦100000
     * 100000 naira
     * 100k
     * under 100000
     * below ₦150000
     */

    const kMatch =
      normalized.match(
        /(?:₦|\bngn\s*)?(\d+(?:\.\d+)?)\s*k\b/
      );

    if (kMatch) {
      return Number(kMatch[1]) * 1000;
    }

    const regularMatch =
      normalized.match(
        /(?:₦|\bngn\s*|naira\s*)(\d+(?:\.\d+)?)/
      );

    if (regularMatch) {
      return Number(
        regularMatch[1]
      );
    }

    return null;
  };

  /*
   * --------------------------------------------------
   * FIND BEDROOMS
   * --------------------------------------------------
   */

  const detectBedrooms = (text) => {
    const match =
      text.match(
        /(\d+)\s*(?:bedroom|bedrooms|br)\b/i
      );

    if (match) {
      return Number(match[1]);
    }

    return null;
  };

  /*
   * --------------------------------------------------
   * FIND GUESTS
   * --------------------------------------------------
   */

  const detectGuests = (text) => {
    const match =
      text.match(
        /(?:for|with|up to)\s*(\d+)\s*(?:guest|guests|people|persons)?/i
      );

    if (match) {
      return Number(match[1]);
    }

    return null;
  };

  /*
   * --------------------------------------------------
   * SEARCH PROPERTIES
   * --------------------------------------------------
   */

  const searchProperties = (
    userMessage
  ) => {
    const text =
      userMessage.toLowerCase();

    const propertyType =
      detectPropertyType(text);

    const location =
      detectLocation(text);

    const budget =
      detectBudget(text);

    const bedrooms =
      detectBedrooms(text);

    const guests =
      detectGuests(text);

    let results = [...properties];

    /*
     * PROPERTY TYPE
     */

    if (propertyType) {
      results = results.filter(
        (property) =>
          getPropertyType(
            property
          ) === propertyType
      );
    }

    /*
     * LOCATION
     */

    if (location) {
      results = results.filter(
        (property) =>
          getPropertyLocation(
            property
          ).includes(location)
      );
    }

    /*
     * BUDGET
     */

    if (budget !== null) {
      results = results.filter(
        (property) => {
          const price =
            getPropertyPrice(
              property
            );

          return (
            price > 0 &&
            price <= budget
          );
        }
      );
    }

    /*
     * BEDROOMS
     */

    if (bedrooms !== null) {
      results = results.filter(
        (property) =>
          getBedrooms(property) >=
          bedrooms
      );
    }

    /*
     * GUESTS
     */

    if (guests !== null) {
      results = results.filter(
        (property) =>
          getGuests(property) >=
          guests
      );
    }

    /*
     * If nothing was detected,
     * don't randomly return properties.
     */

    const hasSearchCriteria =
      propertyType ||
      location ||
      budget !== null ||
      bedrooms !== null ||
      guests !== null;

    if (!hasSearchCriteria) {
      return [];
    }

    return results;
  };

  /*
   * --------------------------------------------------
   * FORMAT PROPERTY TYPE
   * --------------------------------------------------
   */

  const formatPropertyType = (
    type
  ) => {
    if (!type) return "properties";

    return (
      type.charAt(0).toUpperCase() +
      type.slice(1)
    );
  };

  /*
   * --------------------------------------------------
   * GENERATE LOCAL AI RESPONSE
   * --------------------------------------------------
   */

  const generateAIResponse = async (
    userMessage
  ) => {
    const text =
      userMessage
        .trim()
        .toLowerCase();

    /*
     * GREETINGS
     */

    if (
      /^(hi|hello|hey|hiya|good morning|good afternoon|good evening)\b/.test(
        text
      )
    ) {
      return {
        text:
          "Hi 👋 Welcome to ApexHomes. I'm Apex, your travel assistant. I can help you find apartments, houses, villas, hotels, resorts and other stays. Tell me where you're going or what kind of place you're looking for.",
      };
    }

    /*
     * THANK YOU
     */

    if (
      text.includes("thank you") ||
      text === "thanks" ||
      text.includes("thank u")
    ) {
      return {
        text:
          "You're welcome 😊 Whenever you're ready, tell me what kind of stay you're looking for and I'll help you find one.",
      };
    }

    /*
     * WHAT CAN YOU DO?
     */

    if (
      text.includes(
        "what can you do"
      ) ||
      text.includes(
        "how can you help"
      ) ||
      text.includes(
        "what do you help"
      ) ||
      text.includes(
        "what can you help"
      )
    ) {
      return {
        text:
          "I can help you find stays on ApexHomes by location, property type, budget, bedrooms and guest capacity. Try asking me something like “Find me a villa in Lagos” or “Show me a 2-bedroom apartment under ₦100,000.”",
      };
    }

    /*
     * HELP
     */

    if (
      text === "help" ||
      text.includes(
        "how does this work"
      )
    ) {
      return {
        text:
          "It's simple 😊 Tell me where you want to stay, what type of property you want, your budget, number of bedrooms or how many guests you're travelling with. I'll show you matching ApexHomes properties.",
      };
    }

    /*
     * THANKS / GOODBYE
     */

    if (
      text === "bye" ||
      text.includes(
        "goodbye"
      )
    ) {
      return {
        text:
          "See you soon 👋 Whenever you're ready for your next stay, ApexHomes will be here.",
      };
    }

    /*
     * SEARCH REAL PROPERTIES
     */

    const matchedProperties =
      searchProperties(
        userMessage
      );

    if (
      matchedProperties.length >
      0
    ) {
      const propertyType =
        detectPropertyType(text);

      const location =
        detectLocation(text);

      const budget =
        detectBudget(text);

      const bedrooms =
        detectBedrooms(text);

      const guests =
        detectGuests(text);

      let description =
        `I found ${matchedProperties.length} ${
          matchedProperties.length ===
          1
            ? "property"
            : "properties"
        }`;

      if (propertyType) {
        description += ` ${
          formatPropertyType(
            propertyType
          )
        }`;
      }

      if (location) {
        description += ` in ${
          location
            .split(" ")
            .map(
              (word) =>
                word
                  .charAt(0)
                  .toUpperCase() +
                word.slice(1)
            )
            .join(" ")
        }`;
      }

      if (budget !== null) {
        description += ` within your budget`;
      }

      if (bedrooms !== null) {
        description += ` with at least ${bedrooms} ${
          bedrooms === 1
            ? "bedroom"
            : "bedrooms"
        }`;
      }

      if (guests !== null) {
        description += ` for ${guests} ${
          guests === 1
            ? "guest"
            : "guests"
        }`;
      }

      description +=
        ". Take a look at the options below and choose one to view the full property.";

      return {
        text: description,
        properties:
          matchedProperties.slice(
            0,
            5
          ),
      };
    }

    /*
     * SEARCH REQUEST BUT NO RESULTS
     */

    const hasSearchWords =
      PROPERTY_TYPES.some(
        (type) =>
          text.includes(type)
      ) ||
      text.includes("find") ||
      text.includes("show") ||
      text.includes("looking for") ||
      text.includes("stay") ||
      text.includes("place") ||
      text.includes("property");

    if (hasSearchWords) {
      const propertyType =
        detectPropertyType(text);

      const location =
        detectLocation(text);

      if (
        propertyType &&
        location
      ) {
        return {
          text:
            `I couldn't find any ${formatPropertyType(
              propertyType
            )} properties in ${
              location
                .split(" ")
                .map(
                  (word) =>
                    word
                      .charAt(0)
                      .toUpperCase() +
                    word.slice(1)
                )
                .join(" ")
            } right now. Try another property type or location.`,
        };
      }

      if (propertyType) {
        return {
          text:
            `I couldn't find any ${formatPropertyType(
              propertyType
            )} properties matching that request right now. Try another property type or location.`,
        };
      }

      if (location) {
        return {
          text:
            `I couldn't find any properties matching your request in ${
              location
                .split(" ")
                .map(
                  (word) =>
                    word
                      .charAt(0)
                      .toUpperCase() +
                    word.slice(1)
                )
                .join(" ")
            } right now. Try another location or property type.`,
        };
      }

      return {
        text:
          "I couldn't find a property matching those details right now. Try giving me a location, property type, budget, bedrooms or number of guests.",
      };
    }

    /*
     * GENERAL APEX RESPONSE
     */

    return {
      text:
        "I can help you find a stay on ApexHomes. Try something like “Find me a villa in Lagos”, “Show me apartments under ₦100,000”, or “I need a 2-bedroom house for 4 guests.”",
    };
  };

  /*
   * --------------------------------------------------
   * SEND MESSAGE
   * --------------------------------------------------
   */

  const handleSendMessage = async (
    message
  ) => {
    if (
      !message?.trim() ||
      loading
    ) {
      return;
    }

    const cleanMessage =
      message.trim();

    addMessage({
      role: "user",
      content: cleanMessage,
    });

    setLoading(true);

    try {
      /*
       * Local Apex assistant.
       *
       * No OpenAI API call.
       * No API credits required.
       */

      const response =
        await generateAIResponse(
          cleanMessage
        );

      addMessage({
        role: "assistant",
        content: response.text,
        properties:
          response.properties || [],
      });

      /*
       * Optional callback.
       */

      onSearch?.({
        message: cleanMessage,
      });
    } catch (error) {
      console.error(
        "Apex AI error:",
        error
      );

      addMessage({
        role: "assistant",
        content:
          "Sorry, I couldn't process that request right now. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * SUGGESTION
   * --------------------------------------------------
   */

  const handleSuggestion = (
    suggestion
  ) => {
    handleSendMessage(
      suggestion
    );
  };

  /*
   * --------------------------------------------------
   * PROPERTY SELECT
   * --------------------------------------------------
   */

  const handlePropertySelect = (
    property
  ) => {
    if (onPropertySelect) {
      onPropertySelect(property);
      return;
    }

    const propertyId =
      property?._id ||
      property?.id;

    if (!propertyId) {
      return;
    }

    setIsOpen(false);

    navigate(
      `/properties/${propertyId}`
    );
  };

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

  return (
    <>
      {/* =================================================
          FLOATING AI BUTTON
      ================================================== */}

      {!isOpen && (
        <button
          type="button"
          onClick={() =>
            setIsOpen(true)
          }
          aria-label="Open ApexHomes AI assistant"
          className={`fixed z-50 ${
            positionClasses[
              position
            ]
          } flex h-14 w-14 items-center justify-center rounded-full bg-gray-950 text-white shadow-2xl transition hover:scale-105`}
        >
          <Sparkles size={23} />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-gray-950 shadow">
            AI
          </span>
        </button>
      )}

      {/* =================================================
          ASSISTANT
      ================================================== */}

      {isOpen && (
        <div
          className={`fixed z-50 ${
            positionClasses[
              position
            ]
          } ${
            isMinimized
              ? "w-72"
              : "w-[calc(100vw-2rem)] sm:w-[420px]"
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="flex items-center justify-between bg-gray-950 px-5 py-4 text-white">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Apex AI
                  </h2>

                  {!isMinimized && (
                    <p className="text-[11px] text-gray-400">
                      Your personal stay assistant
                    </p>
                  )}
                </div>

              </div>

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  onClick={() =>
                    setIsMinimized(
                      (value) =>
                        !value
                    )
                  }
                  className="rounded-lg p-2 hover:bg-white/10"
                  aria-label={
                    isMinimized
                      ? "Expand assistant"
                      : "Minimize assistant"
                  }
                >
                  <Minimize2 size={16} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="rounded-lg p-2 hover:bg-white/10"
                  aria-label="Close assistant"
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {!isMinimized && (
              <>
                {/* =================================================
                    CHAT
                ================================================== */}

                <AIChat
                  messages={messages}
                  loading={loading}
                  onPropertySelect={
                    handlePropertySelect
                  }
                />

                {/* =================================================
                    SUGGESTIONS
                ================================================== */}

                {messages.length ===
                  1 && (
                  <AISuggestions
                    onSelect={
                      handleSuggestion
                    }
                  />
                )}

                {/* =================================================
                    INPUT
                ================================================== */}

                <div className="border-t border-gray-100 p-3">
                  <AIInput
                    onSend={
                      handleSendMessage
                    }
                    loading={loading}
                  />
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;