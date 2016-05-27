export class TrackerError extends Error {
  statusCode: number;
  message: string;

  constructor (message?: string) {
    super(message);
    this.message = message;
  }
}

export class NotFoundError extends TrackerError {
  statusCode = 404;
  message = 'Not found';
}

export class RequestParamsError extends TrackerError {
  statusCode = 400;
}

export class InternalServerError extends TrackerError {
  statusCode = 500;
}
