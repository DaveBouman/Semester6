import MessageConsumer from "../consumers/messageConsumer";
import { kafka } from "../dataSource";
import { Message } from "../entities/database/message";
import MessageRepository from "../repositories/messageRepository";
import BaseService from "./baseService";

class UserService extends BaseService<Message> {

    constructor(private messageRepository = new MessageRepository(Message),
    ) {
        super(Message);
        MessageConsumer;
    }


    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default UserService