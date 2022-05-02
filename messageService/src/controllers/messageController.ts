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

    test = async (req: Request, res: Response) => {
        return res.send({
            message: "successful",
            entity: 'this is atest',
        });
    };
}

export default MessageController
