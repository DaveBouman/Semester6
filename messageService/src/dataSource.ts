import { Kafka } from "kafkajs"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "mssql",
    host: "semesteruserservice.database.windows.net",
    port: 1433,
    username: "davebouman",
    password: "W7BMZkn9H5cX9jQ",
    database: "messageService",
    // url: 'Server=tcp:semesteruserservice.database.windows.net,1433;Initial Catalog=messageService;Persist Security Info=False;User ID=davebouman;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;',
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    entities: ['src/entities/**/*.ts', 'entities/**/*.js'],
    migrations: ['api/migrations/**/*.ts', 'migrations/**/*.js'],
    extra: {
        encrypt: true
    },
});