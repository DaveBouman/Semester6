import 'dotenv/config'
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index';
import morganMiddleware from './middleware/morganMiddelware';
import cookieSession from "cookie-session";
import './middleware/passportMiddleware';
import passport from 'passport';
import DataSource, { kafka } from './dataSource';
import Logger from './logger/logger';
import { Kafka } from 'kafkajs';

const corsOptions = {
    origin: '*',
    methods: "GET, PUT, DELETE, POST",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

DataSource
    .initialize()
    .then(() => {
        Logger.info("Data Source has been initialized!")
    })
    .catch((err: Error) => {
        Logger.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(
    cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SESSIONS_KEY],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));
app.use('/api/v1', routes);

// start express server
app.listen(5000);


async function main() {

    const kafka = new Kafka({
        clientId: 'Kafka-test',
        brokers: ['kafka:9092'],
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    await producer.disconnect()

    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })
}

main();