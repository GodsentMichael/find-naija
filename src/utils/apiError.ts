class ApiError extends Error {
    statusCode: number;
    errorCode?: string;
    validationErrors?: Record<string, string[]>;
  
    constructor(statusCode: number, message: string, errorCode?: string, validationErrors?: Record<string, string[]>) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.validationErrors = validationErrors;
    }
  }
  
  export default ApiError;
  