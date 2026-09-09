import {
  MapPin,
  Wallet,
  Heart,
  Sparkles,
} from "lucide-react";

const AISuggestions = ({
  onSelect,
}) => {
  const suggestions = [
    {
      label: "Find stays in Lagos",
      icon: MapPin,
      prompt:
        "Find me some good places to stay in Lagos",
    },
    {
      label: "Budget stays",
      icon: Wallet,
      prompt:
        "Show me affordable places to stay",
    },
    {
      label: "Romantic getaway",
      icon: Heart,
      prompt:
        "I want a romantic place for two",
    },
    {
      label: "Luxury stays",
      icon: Sparkles,
      prompt:
        "Show me luxury properties",
    },
  ];

  return (
    <div className="border-t border-gray-100 px-4 py-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        Try asking
      </p>

      <div className="grid grid-cols-2 gap-2">
        {suggestions.map(
          ({
            label,
            icon: Icon,
            prompt,
          }) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                onSelect?.(prompt)
              }
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left text-xs font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
            >
              <Icon
                size={14}
                className="shrink-0 text-gray-500"
              />

              <span className="truncate">
                {label}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AISuggestions;