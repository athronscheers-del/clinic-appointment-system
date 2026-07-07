const morgan = require('morgan');

// Custom format: method, url, status, response time
const requestLogger = morgan(':method :url :status - :response-time ms');

module.exports = requestLogger;