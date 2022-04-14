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
import { CommunicationProtocolEnum, DaprClient, DaprServer } from 'dapr-client';

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
app.listen(3000);

async function main() {
    console.log("test");
    const daprHost = 'user-service-dapr';
    const daprPort = '50002';
    const serverHost = 'user-service';
    const serverPort = '3501';

    const server = new DaprServer(serverHost, serverPort, daprHost, daprPort);
    const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.GRPC);

    await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: any) => console.log(`Received: ${JSON.stringify(data)}`));
    await server.start();

    // Send a message
    await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "world" });
}

main();