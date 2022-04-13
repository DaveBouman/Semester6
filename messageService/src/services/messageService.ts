import { DeepPartial } from "typeorm";
import MessageConsumer from "../consumers/messageConsumer";
import { Message } from "../entities/database/message";
import MessageRepository from "../repositories/messageRepository";
import BaseService from "./baseService";

class MessageService extends BaseService<Message> {

    constructor(private messageRepository = new MessageRepository(Message),
    ) {
        super(Message);
        MessageConsumer;
    }

    override async create(entity: Message) {

        return this.messageRepository.create(entity);
    }


}

export default MessageService