import * as Sentry from '@sentry/browser'
import * as process from 'process'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: process.env.MODE,
  tracesSampleRate: 1.0,
})

export default Sentry
