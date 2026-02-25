// // Import with `import * as Sentry from "@sentry/node"` if you are using ESM
// const Sentry = require("@sentry/node");

// Sentry.init({
//   dsn: "https://b031afa28d1d8c7aea95d945d997aaf3@o4510935647780864.ingest.us.sentry.io/4510935653613568",
//   // Setting this option to true will send default PII data to Sentry.
//   // For example, automatic IP address collection on events
//   sendDefaultPii: true,
// });

// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://b031afa28d1d8c7aea95d945d997aaf3@o4510935647780864.ingest.us.sentry.io/4510935653613568",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});