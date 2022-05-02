import User from '../entities/database/user';
import { BaseRepository } from './baseRepository';

class UserRepository extends BaseRepository<User> {


    getOneByEmail = async (email: string) => {
        return await this.repository.findOne({
            where: {
                email: email
            }
        })
    }

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return await this.repository.findOne({
    //         where: {
    //             uuid: uuid
    //         }
    //     })
    // }

}

export default UserRepository