import { Request, Response } from 'express';
import { Message } from '../entities/database/message';
import MessageService from '../services/messageService';
import BaseController from './baseController';
import jwt_decode from "jwt-decode";

class MessageController extends BaseController<Message> {

    constructor(private messageService = new MessageService()) {
        super(Message);
    }

    override create = async (req: Request, res: Response) => {
        const jwt = `${req.cookies['session.sig']}.${req.cookies["session"]}`;
        const decoded = jwt_decode(jwt);

        const entity = new Message();
        entity.content = req.body.content;
        entity.userId = decoded.passport.user.id;

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
