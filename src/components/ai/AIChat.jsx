import { useEffect, useRef } from "react";
import AIMessage from "./AIMessage";
import { Loader2 } from "lucide-react";

const AIChat = ({
  messages = [],
  loading = false,
  onPropertySelect,
}) => {
  const messagesEndRef =
    useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-[430px] flex-col overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-5">
          {messages.map((message) => (
            <AIMessage
              key={message.id}
              message={message}
              onPropertySelect={
                onPropertySelect
              }
            />
          ))}

          {/* Typing */}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="text-xs font-bold">
                  A
                </span>
              </div>

              <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2
                    size={14}
                    className="animate-spin text-gray-500"
                  />

                  <span className="text-xs text-gray-500">
                    Apex is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AIChat;