import { Message } from '../entities/database/message';
import { BaseRepository } from './baseRepository';

class MessageRepository extends BaseRepository<Message> {

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

export default MessageRepository