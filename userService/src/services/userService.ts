import User from "../entities/database/user";
import UserRepository from "../repositories/userRepository";
import BaseService from "./baseService";
import KafkaService from "./kafkaService";

class UserService extends BaseService<User> {

    constructor(private userRepository = new UserRepository(User),
    ) {
        super(User);
        // UserConsumer;
    }

    getOneByEmail = async (email: string) => {
        const entity = this.userRepository.getOneByEmail(email);

        return entity;
    }

    getUser = async () => {

    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default UserService