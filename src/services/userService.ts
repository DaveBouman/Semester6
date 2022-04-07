import { getRepository } from "typeorm";
import User from "../entities/database/user";

class UserService {

    async getOneById(id: string): Promise<User> {
        const user = await getRepository(User).findOne({ socialId: id }) as unknown as User;
        return user;
    }

    async getOneByEmail(email: string): Promise<User> {
        const result = await getRepository(User)
            .findOne({ email: email }) as User;
        return result;
    }

    async getList() {
        const users = await getRepository(User).find();
        return users;
    }

    async create(user: User): Promise<User> {
        const newUser = new User();

        newUser.email = user.email;
        newUser.familyName = user.familyName;
        newUser.socialId = user.socialId;
        newUser.social = user.social;
        newUser.imageUrl = user.imageUrl;
        newUser.name = user.name;

        const result = await getRepository(User).save(newUser);
        return result;
    }
}

export default UserService;