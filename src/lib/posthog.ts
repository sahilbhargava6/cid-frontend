// PostHog integration stub for frontend analytics (zero-dependency compile-ready template)
export function initPostHog() {
  if (
    typeof window !== 'undefined' &&
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_POSTHOG_KEY
  ) {
    console.log('PostHog analytics initialized with key:', process.env.NEXT_PUBLIC_POSTHOG_KEY);
  }
}

export function captureEvent(eventName: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[Analytics Event] ${eventName}:`, properties);
  }
}
