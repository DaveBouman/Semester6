import { Kafka, Message, Producer } from "kafkajs"
import { kafka } from "../dataSource";

class KafkaService {
    producer: Producer;

    constructor() {
        this.producer = kafka.producer();
    }

    createConsumer = async (groupId: string, topic: string, fromBeginning: boolean) => {
        const consumer = kafka.consumer({ groupId: groupId })
        await consumer.connect();
        await consumer.subscribe({ topic: topic, fromBeginning: fromBeginning });

        return consumer;
    }

}

export default KafkaService