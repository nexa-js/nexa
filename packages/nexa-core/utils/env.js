export const NEXA_PORT = process.env.NEXA_PORT || 3000;
export const NEXA_DEV_MODE = process.env.NEXA_DEV_MODE || false;
export const NEXA_MAIN_LOCATION = process.argv[1];

export default {
    NEXA_PORT,
    NEXA_DEV_MODE,
    NEXA_MAIN_LOCATION,
}