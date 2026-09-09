import {
  Minus,
  Plus,
  Users,
} from "lucide-react";

const GuestSelector = ({
  guests = {},
  onChange,
}) => {
  const {
    adults = 0,
    children = 0,
    infants = 0,
  } = guests;

  const updateGuests = (
    type,
    amount
  ) => {
    const currentValue =
      guests[type] || 0;

    const newValue = Math.max(
      0,
      currentValue + amount
    );

    onChange?.({
      ...guests,
      [type]: newValue,
    });
  };

  const totalGuests =
    adults + children;

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Users
            size={19}
            className="text-gray-700"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-950">
            Who's staying?
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            {totalGuests > 0
              ? `${totalGuests} guest${
                  totalGuests > 1
                    ? "s"
                    : ""
                }`
              : "Add guests"}
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <GuestRow
          title="Adults"
          description="Age 13+"
          value={adults}
          onDecrease={() =>
            updateGuests(
              "adults",
              -1
            )
          }
          onIncrease={() =>
            updateGuests(
              "adults",
              1
            )
          }
        />

        <GuestRow
          title="Children"
          description="Ages 2–12"
          value={children}
          onDecrease={() =>
            updateGuests(
              "children",
              -1
            )
          }
          onIncrease={() =>
            updateGuests(
              "children",
              1
            )
          }
        />

        <GuestRow
          title="Infants"
          description="Under 2"
          value={infants}
          onDecrease={() =>
            updateGuests(
              "infants",
              -1
            )
          }
          onIncrease={() =>
            updateGuests(
              "infants",
              1
            )
          }
        />
      </div>
    </div>
  );
};

const GuestRow = ({
  title,
  description,
  value,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <p className="text-sm font-medium text-gray-950">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value === 0}
          aria-label={`Decrease ${title}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-950 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus size={14} />
        </button>

        <span className="w-5 text-center text-sm font-medium text-gray-900">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          aria-label={`Increase ${title}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-950"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default GuestSelector;