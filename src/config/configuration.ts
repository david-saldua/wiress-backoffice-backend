import * as dotenv from 'dotenv';

dotenv.config();

export const mongoDbURL = process.env.MONGODB_URL;
