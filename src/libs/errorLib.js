import * as Sentry from "@sentry/browser";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn: "https://b011086962094c69899c420ad8926d71@o375975.ingest.sentry.io/5456861",
  });
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

export function onError(error) {
  if (!error) return console.log('No error?', error);
  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message)
  } else if (error.config && error.config.url) {  // API errors
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  alert(message);
}
