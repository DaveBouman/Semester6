import { Message } from '../entities/database/message';
import BaseController from './baseController';

class MessageController extends BaseController<Message> {

    constructor(
    ) {
        super(Message);
    }

    /*
    example function on how to override from base implementation
    */

    // override getOneById = async (req: Request, res: Response) => {
    //     const id = req.params.id as unknown as number;

    //     const entity = await this.todoService.getOneByUUID(id);

    //     return res.send({
    //         message: 'successful',
    //         entity: entity
    //     });
    // }
}

export default MessageController
