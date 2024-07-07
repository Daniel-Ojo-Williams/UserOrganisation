class CustomError extends Error {
  constructor(public status_code: number, public message: string, public status: string) {
    super(message);
  }
}

export default CustomError;
