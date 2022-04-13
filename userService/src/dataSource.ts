import { Kafka } from "kafkajs"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "mysql",
    host: "database",
    port: 3306,
    username: "admin",
    password: "admin",
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