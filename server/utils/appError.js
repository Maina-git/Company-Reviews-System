
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    // "fail" for 4xx errors, "error" for 5xx errors
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Capture stack trace (cleaner error logs)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;











