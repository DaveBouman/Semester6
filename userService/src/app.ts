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
import Logger from './logger/logger';
import { CommunicationProtocolEnum, DaprClient, DaprServer } from 'dapr-client';
import { cli } from 'winston/lib/winston/config';

const corsOptions = {
    origin: '*',
    methods: "GET, PUT, DELETE, POST",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// DataSource
//     .initialize()
//     .then(() => {
//         Logger.info("Data Source has been initialized!")
//     })
//     .catch((err: Error) => {
//         Logger.error("Error during Data Source initialization:", err)
//     })

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
// app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));
app.use('/api/v1', routes);

// app.use("/dapr", () => console.log("this is a test"));
// start express server

app.listen(3001);




async function start() {
    const daprHost = 'localhost';
    const daprPort = '53001';
    const serverHost = 'localhost';
    const serverPort = '3000';
    console.log("test");


    const server = new DaprServer(serverHost, serverPort, daprHost, daprPort, CommunicationProtocolEnum.HTTP);
    const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.HTTP);
    console.log("test2");

    // Initialize the server to subscribe (listen)
    await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: Record<string, any>) => {
        // The library parses JSON when possible.
        console.log(`[Dapr-JS][Example] Received on subscription: ${JSON.stringify(data)}`)
    });

    await server.start();
    console.log("test3");

    // Send a message
    await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "world" });
    console.log("test4");
    app.use('/dapr', async () => await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "This is by api" }));
    // await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: any) => console.log(`Received: ${JSON.stringify(data)}`));
}

start().catch((e) => {
    console.error(e);
    process.exit(1);
});
