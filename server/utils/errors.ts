class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof BadAuthorization) {
      return 401;
    }

    return 500;
  }
  setGenericMessage() {}
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class BadAuthorization extends GeneralError {}

export { GeneralError, BadRequest, NotFound, BadAuthorization };
