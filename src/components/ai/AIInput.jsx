import { useState } from "react";
import {
  Send,
  Loader2,
} from "lucide-react";

const AIInput = ({
  onSend,
  loading = false,
}) => {
  const [value, setValue] =
    useState("");

  const handleSubmit = () => {
    const message = value.trim();

    if (!message || loading) return;

    onSend?.(message);

    setValue("");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-gray-400">
      <textarea
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Ask Apex anything..."
        rows={1}
        disabled={loading}
        className="max-h-24 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-50"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={
          !value.trim() || loading
        }
        aria-label="Send message"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
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
  );
};

export default AIInput;