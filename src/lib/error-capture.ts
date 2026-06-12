// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.
//
// h3's default error handler does `console.error(error)` for unhandled errors
// (the HTTPError instance, whose `.cause` chain holds the real underlying
// error) — it does NOT dispatch a global "error"/"unhandledrejection" event.
// So in addition to the event listeners below, we also wrap console.error.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const candidate = args.find((a) => a instanceof Error);
  if (candidate) record(candidate);
  originalConsoleError(...args);
};

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
