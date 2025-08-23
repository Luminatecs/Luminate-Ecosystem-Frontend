/**
 * logUtils.ts - Utility functions for enhanced console logging in React
 * 
 * This file provides functions to format console logs in a more
 * structured and visually appealing way for debugging in web browsers.
 */

type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug';

// CSS styles for browser console (since ANSI codes don't work in browsers)
const styles = {
  info: 'color: #17a2b8; font-weight: bold;',
  success: 'color: #28a745; font-weight: bold;',
  warn: 'color: #ffc107; font-weight: bold;',
  error: 'color: #dc3545; font-weight: bold;',
  debug: 'color: #6f42c1; font-weight: bold;',
  label: 'color: #212529; font-weight: bold; font-size: 14px;',
  timestamp: 'color: #6c757d; font-size: 12px;',
  data: 'color: #495057; font-family: monospace;'
};

// Emojis for different log levels
const emojis = {
  info: '🔷',
  success: '✅',
  warn: '⚠️',
  error: '❌',
  debug: '🔍',
};

/**
 * Determine if we're in development or production mode
 * Logs will be more verbose in development
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * Format current timestamp for logging
 */
const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substr(0, 19);
};

/**
 * Create a nicely formatted group header
 */
const createGroupHeader = (title: string): void => {
  const line = '━'.repeat(50);
  console.log(`%c\n${line}`, 'color: #6c757d;');
  console.log(`%c ${title} `, styles.label);
  console.log(`%c${line}\n`, 'color: #6c757d;');
};

/**
 * Log with structured format using browser console styling
 */
const logWithFormat = (level: LogLevel, message: string, data?: any): void => {
  const emoji = emojis[level];
  const style = styles[level];
  const timestamp = getTimestamp();
  
  // Format: [TIMESTAMP] EMOJI LEVEL: Message
  const prefix = `[${timestamp}] ${emoji} ${level.toUpperCase()}: `;
  
  // Log the message with styling
  console.log(`%c${prefix}%c${message}`, styles.timestamp, style);
  
  // If we have data, log it nicely formatted
  if (data !== undefined) {
    console.log('%cData:', styles.data);
    if (typeof data === 'object' && data !== null) {
      console.log(data); // Browser console handles object formatting well
    } else {
      console.log('%c' + data, styles.data);
    }
    console.log(); // Empty line for better readability
  }
};

/**
 * Public logging methods
 */
const Logger = {
  info: (message: string, data?: any): void => logWithFormat('info', message, data),
  success: (message: string, data?: any): void => logWithFormat('success', message, data),
  warn: (message: string, data?: any): void => logWithFormat('warn', message, data),
  error: (message: string, data?: any): void => logWithFormat('error', message, data),
  debug: (message: string, data?: any): void => {
    // Only log debug messages in development
    if (isDev) {
      logWithFormat('debug', message, data);
    }
  },
  
  // Creates a titled group for related logs
  group: (title: string): void => {
    if (isDev) {
      createGroupHeader(title);
    }
  },
  
  // API Response logging helper
  response: (title: string, response: any): void => {
    if (isDev) {
      createGroupHeader(`API RESPONSE: ${title}`);
      if (response) {
        Logger.info('Status', response.status || 'Unknown');
        Logger.info('Response Data', response.data);
      } else {
        Logger.error('Empty or undefined response');
      }
    }
  },
  
  // Object logging with title
  object: (title: string, obj: any): void => {
    if (isDev) {
      createGroupHeader(title);
      console.log('%c' + title, styles.label);
      console.log(obj);
      console.log(); // Empty line for better readability
    }
  },
  
  // Development mode only full object inspection
  inspect: (obj: any, title = 'INSPECT'): void => {
    if (isDev) {
      createGroupHeader(title);
      console.log('%c' + title, styles.label);
      console.dir(obj, { depth: null });
      console.log(); // Empty line for better readability
    }
  },

  // Simple console.log wrapper for production-safe logging
  log: (...args: any[]): void => {
    if (isDev) {
      console.log(...args);
    }
  },

  // Table logging for arrays and objects
  table: (data: any, title?: string): void => {
    if (isDev) {
      if (title) {
        console.log(`%c${title}`, styles.label);
      }
      console.table(data);
    }
  }
};

export default Logger;
