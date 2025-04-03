
import { toastService } from "./toast";

/**
 * Centralized error handling utility
 */

/**
 * Generic asynchronous function wrapper with error handling
 * @param promise The promise or async function to execute
 * @param errorMessage Custom error message to display on failure
 * @returns Promise that resolves to the result or null on error
 */
export async function handleAsync<T>(
  promise: Promise<T> | (() => Promise<T>),
  errorMessage = "Se produjo un error. Por favor, inténtalo de nuevo."
): Promise<T | null> {
  try {
    const result = typeof promise === "function" ? await promise() : await promise;
    return result;
  } catch (error) {
    console.error("Error in async operation:", error);
    
    // Extract error message if available
    let message = errorMessage;
    if (error instanceof Error) {
      message = error.message || errorMessage;
    }
    
    toastService.error("Error", message);
    return null;
  }
}

/**
 * Wrap a function with try/catch and standardized error handling
 * @param fn The function to wrap
 * @param errorMessage Custom error message to display on failure
 * @returns Wrapped function that handles errors
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorMessage = "Se produjo un error. Por favor, inténtalo de nuevo."
): (...args: Parameters<T>) => ReturnType<T> | null {
  return (...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (error) {
      console.error("Error in function execution:", error);
      
      let message = errorMessage;
      if (error instanceof Error) {
        message = error.message || errorMessage;
      }
      
      toastService.error("Error", message);
      return null;
    }
  };
}
