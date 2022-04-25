import { Request, Response } from 'express';
import { Message } from '../entities/database/message';
import MessageService from '../services/messageService';
import BaseController from './baseController';

class MessageController extends BaseController<Message> {

    constructor(private messageService = new MessageService()) {
        super(Message);
    }

    override create = async (req: Request, res: Response) => {
        const entity = req.body as unknown as Message;

        const response = await this.messageService.create(entity);

        return res.send({
            message: "successful",
            entity: response,
        });
    };

    getTest = async (req: Request, res: Response) => {
        // const entity = req.body as unknown as Message;

        // const response = await this.messageService.create(entity);

        return res.send({
            message: "successful",
            entity: "gettest",
        });
    };

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
