import {
  Sparkles,
  User,
} from "lucide-react";
import AIPropertyRecommendations from "./AIPropertyRecommendations";

const AIMessage = ({
  message,
  onPropertySelect,
}) => {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white">
          <Sparkles size={14} />
        </div>
      )}

      <div
        className={`max-w-[85%] ${
          isUser ? "order-first" : ""
        }`}
      >
        {/* Message */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "rounded-br-md bg-gray-950 text-white"
              : "rounded-bl-md bg-gray-100 text-gray-900"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-6">
            {message.content}
          </p>
        </div>

        {/* Recommendations */}
        {!isUser &&
          message.properties?.length >
            0 && (
            <AIPropertyRecommendations
              properties={
                message.properties
              }
              onPropertySelect={
                onPropertySelect
              }
            />
          )}

        {/* Time */}
        {message.timestamp && (
          <p
            className={`mt-1 text-[10px] text-gray-400 ${
              isUser
                ? "text-right"
                : "text-left"
            }`}
          >
            {new Date(
              message.timestamp
            ).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </p>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700">
          <User size={14} />
        </div>
      )}
    </div>
  );
};

export default AIMessage;