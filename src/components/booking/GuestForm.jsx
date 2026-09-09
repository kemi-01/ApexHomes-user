import {
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
} from "lucide-react";

const GuestForm = ({
  guest = {},
  onChange,
  errors = {},
}) => {
  const updateField = (field, value) => {
    onChange?.({
      ...guest,
      [field]: value,
    });
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6">

      <div>
        <h2 className="text-lg font-semibold text-gray-950">
          Your information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          No account is required. We'll use your
          email and phone number to identify your
          booking.
        </p>
      </div>

      <div className="mt-6 space-y-5">

        {/* First name */}
        <FormField
          label="First name"
          icon={User}
          required
          error={errors.firstName}
        >
          <input
            type="text"
            value={guest.firstName || ""}
            onChange={(event) =>
              updateField(
                "firstName",
                event.target.value
              )
            }
            placeholder="Enter your first name"
            autoComplete="given-name"
            className="form-input"
          />
        </FormField>

        {/* Last name */}
        <FormField
          label="Last name"
          icon={User}
          required
          error={errors.lastName}
        >
          <input
            type="text"
            value={guest.lastName || ""}
            onChange={(event) =>
              updateField(
                "lastName",
                event.target.value
              )
            }
            placeholder="Enter your last name"
            autoComplete="family-name"
            className="form-input"
          />
        </FormField>

        {/* Email */}
        <FormField
          label="Email address"
          icon={Mail}
          required
          error={errors.email}
        >
          <input
            type="email"
            value={guest.email || ""}
            onChange={(event) =>
              updateField(
                "email",
                event.target.value
              )
            }
            placeholder="you@example.com"
            autoComplete="email"
            className="form-input"
          />
        </FormField>

        {/* Phone */}
        <FormField
          label="Phone number"
          icon={Phone}
          required
          error={errors.phone}
        >
          <input
            type="tel"
            value={guest.phone || ""}
            onChange={(event) =>
              updateField(
                "phone",
                event.target.value
              )
            }
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            className="form-input"
          />
        </FormField>

        {/* Country */}
        <FormField
          label="Country"
          icon={Globe}
          error={errors.country}
        >
          <input
            type="text"
            value={guest.country || ""}
            onChange={(event) =>
              updateField(
                "country",
                event.target.value
              )
            }
            placeholder="Nigeria"
            autoComplete="country-name"
            className="form-input"
          />
        </FormField>

        {/* Special requests */}
        <FormField
          label="Special requests"
          icon={MessageSquare}
          error={errors.specialRequests}
        >
          <textarea
            value={
              guest.specialRequests || ""
            }
            onChange={(event) =>
              updateField(
                "specialRequests",
                event.target.value
              )
            }
            placeholder="Anything you'd like the host to know?"
            rows={4}
            className="form-input resize-none"
          />
        </FormField>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          font-size: 0.875rem;
          color: #111827;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </section>
  );
};

const FormField = ({
  label,
  icon: Icon,
  required = false,
  error,
  children,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
          error
            ? "border-red-400"
            : "border-gray-200"
        }`}
      >
        <Icon
          size={18}
          className="mt-0.5 shrink-0 text-gray-400"
        />

        {children}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default GuestForm;