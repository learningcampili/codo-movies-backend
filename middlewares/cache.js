const getExpeditiousCache = require("express-expeditious");

const cacheOptions = {
  // Namespace used to prevent cache conflicts, must be alphanumeric
  namespace: "expresscache",
  // Store cache entries for 1 minute (can also pass milliseconds e.g 60000)
  defaultTtl: "15 minute",
  statusCodeExpires: {
    400: "5 minutes",
    500: 0,
  },
};

const cacheInit = getExpeditiousCache(cacheOptions);

module.exports = {
  cacheInit,
};
