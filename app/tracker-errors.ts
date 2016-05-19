export class TrackerError extends Error {
  statusCode: number;
}

export class NotFoundError extends TrackerError {
  statusCode = 404;
}

export class RequestParamsError extends TrackerError {
  statusCode = 400;
}

export class InternalServerError extends TrackerError {
  statusCode = 500;
}