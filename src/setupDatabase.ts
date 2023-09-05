import mongoose from "mongoose";
import Logger from "bunyan";
import { config } from './config';
import { redisConnection } from "@service/redis/redis.connection";

const log: Logger = config.createLogger('setupDB');

export default () => {
    const connect = () => {
        mongoose.connect(`${config.DB_URL}`)
            .then(() => {
                log.info('Successfully connected to database.');
                redisConnection.connect();
            })
            .catch((error) => {
                log.error('Error connecting to database', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
