
import { useState } from "react";

type ValidationRule<T extends Record<string, any>> = {
  test: (value: any, formValues: T) => boolean;
  message: string;
};

type ValidationRules<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule<T>[];
};

/**
 * Hook for form validation
 * @param initialValues Initial form values
 * @param validationRules Validation rules for form fields
 * @returns Object with validation utilities
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  /**
   * Validates a single field
   * @param field The field to validate
   * @param values Current form values
   * @returns True if valid, false otherwise
   */
  const validateField = (field: keyof T, values: T): boolean => {
    const fieldRules = validationRules[field];
    
    if (!fieldRules) return true;
    
    for (const rule of fieldRules) {
      const isValid = rule.test(values[field], values);
      
      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          [field]: rule.message,
        }));
        return false;
      }
    }
    
    // Clear error if field is valid
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    
    return true;
  };

  /**
   * Validates all form fields
   * @param values Current form values
   * @returns True if all fields are valid, false otherwise
   */
  const validateForm = (values: T): boolean => {
    let isFormValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof T, boolean>>
    );
    setTouched(allTouched);
    
    // Validate each field with rules
    for (const field in validationRules) {
      const typedField = field as keyof T;
      const fieldRules = validationRules[typedField];
      
      if (!fieldRules) continue;
      
      for (const rule of fieldRules) {
        const isValid = rule.test(values[typedField], values);
        
        if (!isValid) {
          newErrors[typedField] = rule.message;
          isFormValid = false;
          break;
        }
      }
    }
    
    setErrors(newErrors);
    return isFormValid;
  };

  /**
   * Marks a field as touched
   * @param field The field to mark as touched
   */
  const markFieldAsTouched = (field: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  /**
   * Resets validation state
   */
  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    validateField,
    validateForm,
    markFieldAsTouched,
    resetValidation,
  };
}
