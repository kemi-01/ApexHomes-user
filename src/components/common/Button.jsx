import { LoaderCircle } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...props
}) => {
  const variants = {
    primary:
      "bg-gray-950 text-white hover:bg-gray-800",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline:
      "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <LoaderCircle
          size={17}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
};

export default Button;