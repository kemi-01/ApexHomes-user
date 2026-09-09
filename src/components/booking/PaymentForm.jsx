import {
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

const PaymentForm = ({
  payment = {},
  onChange,
  total = 0,
  onSubmit,
  loading = false,
}) => {
  const updatePayment = (field, value) => {
    onChange?.({
      ...payment,
      [field]: value,
    });
  };

  const selectedMethod =
    payment.method || "card";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-950">
          Payment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose how you'd like to pay.
        </p>
      </div>

      {/* Payment methods */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">

        <PaymentMethod
          selected={selectedMethod === "card"}
          icon={CreditCard}
          title="Card"
          onClick={() =>
            updatePayment("method", "card")
          }
        />

        <PaymentMethod
          selected={selectedMethod === "bank"}
          icon={Building2}
          title="Bank transfer"
          onClick={() =>
            updatePayment("method", "bank")
          }
        />

        <PaymentMethod
          selected={selectedMethod === "ussd"}
          icon={Smartphone}
          title="USSD"
          onClick={() =>
            updatePayment("method", "ussd")
          }
        />

      </div>

      {/* Card */}
      {selectedMethod === "card" && (
        <div className="mt-6 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Cardholder name
            </label>

            <input
              type="text"
              value={payment.cardName || ""}
              onChange={(event) =>
                updatePayment(
                  "cardName",
                  event.target.value
                )
              }
              placeholder="Name on card"
              autoComplete="cc-name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-950"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Card number
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={payment.cardNumber || ""}
              onChange={(event) =>
                updatePayment(
                  "cardNumber",
                  event.target.value
                )
              }
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-950"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Expiry
              </label>

              <input
                type="text"
                value={payment.expiry || ""}
                onChange={(event) =>
                  updatePayment(
                    "expiry",
                    event.target.value
                  )
                }
                placeholder="MM/YY"
                autoComplete="cc-exp"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                CVV
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={payment.cvv || ""}
                onChange={(event) =>
                  updatePayment(
                    "cvv",
                    event.target.value
                  )
                }
                placeholder="•••"
                autoComplete="cc-csc"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-950"
              />
            </div>

          </div>
        </div>
      )}

      {/* Bank transfer */}
      {selectedMethod === "bank" && (
        <div className="mt-6 rounded-2xl bg-gray-50 p-5">
          <p className="text-sm font-semibold text-gray-950">
            Bank transfer
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            After you continue, ApexHomes will provide
            the payment instructions and a unique
            payment reference.
          </p>
        </div>
      )}

      {/* USSD */}
      {selectedMethod === "ussd" && (
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Bank
          </label>

          <select
            value={payment.bankCode || ""}
            onChange={(event) =>
              updatePayment(
                "bankCode",
                event.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-950"
          >
            <option value="">
              Select your bank
            </option>

            <option value="access">
              Access Bank
            </option>

            <option value="gtb">
              GTBank
            </option>

            <option value="firstbank">
              First Bank
            </option>

            <option value="uba">
              UBA
            </option>

            <option value="zenith">
              Zenith Bank
            </option>
          </select>
        </div>
      )}

      {/* Security */}
      <div className="mt-6 flex gap-3 rounded-xl bg-gray-50 p-4">
        <ShieldCheck
          size={19}
          className="shrink-0 text-gray-600"
        />

        <p className="text-xs leading-5 text-gray-500">
          Your payment is securely processed.
          ApexHomes does not store your complete
          card details.
        </p>
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={() => onSubmit?.(payment)}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-gray-950 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading
          ? "Processing..."
          : `Continue · ${formatCurrency(total)}`}
      </button>
    </section>
  );
};

const formatCurrency = (amount) => {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
};

const PaymentMethod = ({
  selected,
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-gray-950 bg-gray-50"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <Icon size={19} />

      <span className="text-sm font-medium">
        {title}
      </span>
    </button>
  );
};

export default PaymentForm;