
/**
 * Common validation rules for forms
 */

/**
 * Validates that a field is not empty
 * @param message Custom error message
 * @returns Validation rule
 */
export const required = (message = "Este campo es obligatorio") => ({
  test: (value: any) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (typeof value === "number") return true;
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  },
  message,
});

/**
 * Validates that a field contains a valid email address
 * @param message Custom error message
 * @returns Validation rule
 */
export const email = (message = "Introduce un email válido") => ({
  test: (value: string) => {
    if (!value) return true; // Don't validate empty values, use required for that
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
  },
  message,
});

/**
 * Validates that a field has a minimum length
 * @param length Minimum length required
 * @param message Custom error message
 * @returns Validation rule
 */
export const minLength = (length: number, message = `Debe tener al menos ${length} caracteres`) => ({
  test: (value: string) => {
    if (!value) return true; // Don't validate empty values, use required for that
    return value.length >= length;
  },
  message,
});

/**
 * Validates that a field matches another field (e.g., password confirmation)
 * @param fieldToMatch Name of the field to match
 * @param message Custom error message
 * @returns Validation rule
 */
export const matches = <T extends Record<string, any>>(
  fieldToMatch: keyof T,
  message = "Los campos no coinciden"
) => ({
  test: (value: any, formValues: T) => {
    return value === formValues[fieldToMatch];
  },
  message,
});

/**
 * Validates that a field is a number
 * @param message Custom error message
 * @returns Validation rule
 */
export const number = (message = "Debe ser un número") => ({
  test: (value: any) => {
    if (!value && value !== 0) return true; // Don't validate empty values, use required for that
    return !isNaN(Number(value));
  },
  message,
});

/**
 * Validates that a field is a URL
 * @param message Custom error message
 * @returns Validation rule
 */
export const url = (message = "Introduce una URL válida") => ({
  test: (value: string) => {
    if (!value) return true; // Don't validate empty values, use required for that
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  message,
});

/**
 * Validates that a number is within a specific range
 * @param min Minimum value
 * @param max Maximum value
 * @param message Custom error message
 * @returns Validation rule
 */
export const range = (min: number, max: number, message = `Debe estar entre ${min} y ${max}`) => ({
  test: (value: any) => {
    if (!value && value !== 0) return true; // Don't validate empty values, use required for that
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },
  message,
});
