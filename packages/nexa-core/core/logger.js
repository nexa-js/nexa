import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const NexaLogger = createLogger({
    format: combine(
        label({ label: 'Nexa' }),
        timestamp(),
        myFormat
    ),
    transports: [new transports.Console()]
})