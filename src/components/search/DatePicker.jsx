import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DatePicker = ({
  checkIn,
  checkOut,
  onChange,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  const [selecting, setSelecting] =
    useState(checkIn ? "checkout" : "checkin");

  const secondMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  const formatMonth = (date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const isSameDay = (a, b) => {
    if (!a || !b) return false;

    const dateA = new Date(a);
    const dateB = new Date(b);

    return (
      dateA.getFullYear() ===
        dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  };

  const isBeforeToday = (date) => {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    return target < today;
  };

  const isBetween = (date) => {
    if (!checkIn || !checkOut) return false;

    const target = new Date(date);
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    return target > start && target < end;
  };

  const handleDateClick = (date) => {
    if (isBeforeToday(date)) return;

    if (selecting === "checkin") {
      onChange?.({
        checkIn: date,
        checkOut: null,
      });

      setSelecting("checkout");
      return;
    }

    if (
      checkIn &&
      new Date(date) <= new Date(checkIn)
    ) {
      onChange?.({
        checkIn: date,
        checkOut: null,
      });

      setSelecting("checkout");
      return;
    }

    onChange?.({
      checkIn,
      checkOut: date,
    });

    setSelecting("checkin");
  };

  const generateCalendar = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(year, month, day)
      );
    }

    return days;
  };

  const firstCalendar = useMemo(
    () => generateCalendar(currentMonth),
    [currentMonth]
  );

  const secondCalendar = useMemo(
    () => generateCalendar(secondMonth),
    [currentMonth]
  );

  const changeMonth = (direction) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {selecting === "checkin"
              ? "Select check-in"
              : "Select check-out"}
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-950">
            Choose your dates
          </h3>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            disabled={
              currentMonth.getMonth() ===
                today.getMonth() &&
              currentMonth.getFullYear() ===
                today.getFullYear()
            }
            className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendars */}
      <div className="grid gap-8 md:grid-cols-2">
        <Calendar
          month={currentMonth}
          days={firstCalendar}
          formatMonth={formatMonth}
          isSameDay={isSameDay}
          isBeforeToday={isBeforeToday}
          isBetween={isBetween}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />

        <Calendar
          month={secondMonth}
          days={secondCalendar}
          formatMonth={formatMonth}
          isSameDay={isSameDay}
          isBeforeToday={isBeforeToday}
          isBetween={isBetween}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />
      </div>

      {/* Selected dates */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
        <DateSummary
          label="Check-in"
          date={checkIn}
        />

        <DateSummary
          label="Check-out"
          date={checkOut}
        />
      </div>
    </div>
  );
};

const Calendar = ({
  month,
  days,
  formatMonth,
  isSameDay,
  isBeforeToday,
  isBetween,
  checkIn,
  checkOut,
  onDateClick,
}) => {
  const weekdays = [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ];

  return (
    <div>
      <h4 className="mb-4 text-center text-sm font-semibold text-gray-950">
        {formatMonth(month)}
      </h4>

      <div className="mb-2 grid grid-cols-7">
        {weekdays.map((day) => (
          <span
            key={day}
            className="py-2 text-center text-xs font-medium text-gray-400"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="h-10"
              />
            );
          }

          const disabled =
            isBeforeToday(date);

          const selectedStart =
            isSameDay(date, checkIn);

          const selectedEnd =
            isSameDay(date, checkOut);

          const between =
            isBetween(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() =>
                onDateClick(date)
              }
              className={`relative h-10 text-sm transition ${
                disabled
                  ? "cursor-not-allowed text-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              } ${
                between
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              {(selectedStart ||
                selectedEnd) && (
                <span className="absolute inset-1 flex items-center justify-center rounded-full bg-gray-950 text-white">
                  {date.getDate()}
                </span>
              )}

              {!selectedStart &&
                !selectedEnd && (
                  <span className="relative z-10">
                    {date.getDate()}
                  </span>
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DateSummary = ({
  label,
  date,
}) => {
  const formatted = date
    ? new Date(date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "Not selected";

  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-900">
        {formatted}
      </p>
    </div>
  );
};

export default DatePicker;