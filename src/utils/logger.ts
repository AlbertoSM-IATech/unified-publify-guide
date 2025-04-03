
/**
 * Logger utility for consistent logging throughout the application
 */

type LogLevel = "debug" | "info" | "warn" | "error";

// Default log level based on environment
const DEFAULT_LOG_LEVEL: LogLevel = import.meta.env.DEV ? "debug" : "warn";

// Log level priority (higher number = higher priority)
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Current log level - can be changed at runtime
let currentLogLevel: LogLevel = DEFAULT_LOG_LEVEL;

// Color styles for different log levels
const LOG_STYLES: Record<LogLevel, string> = {
  debug: "color: #808080",
  info: "color: #0077cc",
  warn: "color: #ff9900",
  error: "color: #cc0000; font-weight: bold",
};

/**
 * Set the current log level
 * @param level The log level to set
 */
function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

/**
 * Check if a log level should be displayed
 * @param level The log level to check
 * @returns Whether the log level should be displayed
 */
function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLogLevel];
}

/**
 * Format a timestamp for logs
 * @returns Formatted timestamp
 */
function getTimestamp(): string {
  return new Date().toISOString().split("T")[1].slice(0, 8);
}

/**
 * Format a log message with a prefix
 * @param level Log level
 * @param message Log message
 * @returns Formatted log message
 */
function formatLogMessage(level: LogLevel, message: string): string {
  return `[${getTimestamp()}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Log a debug message
 * @param message The message to log
 * @param data Additional data to log
 */
function debug(message: string, ...data: any[]): void {
  if (shouldLog("debug")) {
    console.debug(`%c${formatLogMessage("debug", message)}`, LOG_STYLES.debug, ...data);
  }
}

/**
 * Log an info message
 * @param message The message to log
 * @param data Additional data to log
 */
function info(message: string, ...data: any[]): void {
  if (shouldLog("info")) {
    console.info(`%c${formatLogMessage("info", message)}`, LOG_STYLES.info, ...data);
  }
}

/**
 * Log a warning message
 * @param message The message to log
 * @param data Additional data to log
 */
function warn(message: string, ...data: any[]): void {
  if (shouldLog("warn")) {
    console.warn(`%c${formatLogMessage("warn", message)}`, LOG_STYLES.warn, ...data);
  }
}

/**
 * Log an error message
 * @param message The message to log
 * @param data Additional data to log
 */
function error(message: string, ...data: any[]): void {
  if (shouldLog("error")) {
    console.error(`%c${formatLogMessage("error", message)}`, LOG_STYLES.error, ...data);
  }
}

/**
 * Create a group of logs with a title
 * @param title The group title
 * @param collapsed Whether the group should be collapsed
 */
function group(title: string, collapsed = false): void {
  if (collapsed) {
    console.groupCollapsed(`%c${formatLogMessage("info", title)}`, LOG_STYLES.info);
  } else {
    console.group(`%c${formatLogMessage("info", title)}`, LOG_STYLES.info);
  }
}

/**
 * End a group of logs
 */
function groupEnd(): void {
  console.groupEnd();
}

/**
 * Measure the time taken for an operation
 * @param label The label for the measurement
 * @param operation The operation to measure
 * @returns The result of the operation
 */
async function measure<T>(label: string, operation: () => Promise<T>): Promise<T> {
  info(`⏱️ ${label} - Starting...`);
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const endTime = performance.now();
    const durationMs = endTime - startTime;
    
    info(`⏱️ ${label} - Completed in ${durationMs.toFixed(2)}ms`);
    return result;
  } catch (err) {
    const endTime = performance.now();
    const durationMs = endTime - startTime;
    
    error(`⏱️ ${label} - Failed after ${durationMs.toFixed(2)}ms`);
    throw err;
  }
}

export const logger = {
  setLogLevel,
  debug,
  info,
  warn,
  error,
  group,
  groupEnd,
  measure,
};
