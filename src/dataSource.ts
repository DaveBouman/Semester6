import { Kafka } from "kafkajs"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    logging: false,
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    entities: ['src/entities/**/*.ts', 'entities/**/*.js'],
    migrations: ['api/migrations/**/*.ts', 'migrations/**/*.js'],
})

export const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
})