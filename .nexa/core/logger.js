const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = {
    NexaLogger: createLogger({
        format: combine(
            label({ label: 'Nexa' }),
            timestamp(),
            myFormat
        ),
        transports: [new transports.Console()]
    })
}