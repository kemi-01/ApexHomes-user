import { SearchX } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  icon: Icon = SearchX,
  title = "Nothing here yet",
  description = "We couldn't find anything to show you.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Icon size={28} className="text-gray-500" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-950">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          className="mt-5"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;