import KafkaService from "../services/kafkaService";

class UserConsumer {
    constructor(private kafkaService = new KafkaService()) {
        this.runConsumers();
    }

    async runConsumers() {
        const consumer = await this.kafkaService.createConsumer('test-user', 'test-topic', true);

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                console.log({
                    key: message.key?.toString(),
                    value: message.value?.toString(),
                    headers: message.headers,
                })
            },
        })
    }
}

export default new UserConsumer();