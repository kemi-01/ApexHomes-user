// src/utils/validators.js

export function required(
  value,
  fieldName = "This field"
) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return `${fieldName} is required.`;
  }

  return "";
}

export function isValidEmail(email) {
  if (!email) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
}

export function isValidPhone(phone) {
  if (!phone) {
    return false;
  }

  const cleanedPhone = phone.replace(
    /[\s\-().]/g,
    ""
  );

  /*
   * International format:
   * + followed by 7–15 digits.
   *
   * We allow a leading 0 as well because
   * users may enter local numbers depending
   * on their selected country.
   */
  return /^(\+?[0-9]{7,15})$/.test(
    cleanedPhone
  );
}

export function isValidGuestCount(
  guests,
  maxGuests = Infinity
) {
  const number = Number(guests);

  return (
    Number.isInteger(number) &&
    number > 0 &&
    number <= maxGuests
  );
}

export function isValidDate(date) {
  if (!date) {
    return false;
  }

  const parsedDate = new Date(date);

  return !Number.isNaN(
    parsedDate.getTime()
  );
}

export function isValidDateRange(
  checkIn,
  checkOut
) {
  if (
    !isValidDate(checkIn) ||
    !isValidDate(checkOut)
  ) {
    return false;
  }

  return (
    new Date(checkOut) >
    new Date(checkIn)
  );
}

export function validateGuestForm(
  formData
) {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName =
      "First name is required.";
  }

  if (!formData.lastName?.trim()) {
    errors.lastName =
      "Last name is required.";
  }

  if (!formData.email?.trim()) {
    errors.email =
      "Email is required.";
  } else if (
    !isValidEmail(formData.email)
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  if (!formData.phone?.trim()) {
    errors.phone =
      "Phone number is required.";
  } else if (
    !isValidPhone(formData.phone)
  ) {
    errors.phone =
      "Please enter a valid phone number.";
  }

  return errors;
}

export function validateBookingDates(
  checkIn,
  checkOut
) {
  const errors = {};

  if (!checkIn) {
    errors.checkIn =
      "Check-in date is required.";
  }

  if (!checkOut) {
    errors.checkOut =
      "Check-out date is required.";
  }

  if (
    checkIn &&
    checkOut &&
    !isValidDateRange(
      checkIn,
      checkOut
    )
  ) {
    errors.dateRange =
      "Check-out must be after check-in.";
  }

  return errors;
}

export default {
  required,
  isValidEmail,
  isValidPhone,
  isValidGuestCount,
  isValidDate,
  isValidDateRange,
  validateGuestForm,
  validateBookingDates,
};