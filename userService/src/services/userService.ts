import UserConsumer from "../consumers/userConsumer";
import User from "../entities/database/user";
import UserRepository from "../repositories/userRepository";
import BaseService from "./baseService";

class UserService extends BaseService<User> {

    constructor(private todoRepository = new UserRepository(User)
    ) {
        super(User);
        UserConsumer;
    }

    insertData = async () => {


    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return this.todoRepository.getOneByUUID(uuid);
    // }

}

export default UserService