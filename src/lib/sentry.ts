// Sentry client configuration hook stub (zero-dependency compile-ready template)
export function initSentry() {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.log('Sentry monitoring initialized with DSN:', process.env.NEXT_PUBLIC_SENTRY_DSN);
  }
}
