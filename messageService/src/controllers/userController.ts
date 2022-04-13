import { Request, Response } from 'express';
import { kafka } from '../dataSource';
import User from '../entities/database/user';
import UserService from '../services/userService';

class UserController {

    constructor(private userService = new UserService()) { }

    async getOneById(req: Request, res: Response) {
        const id = req.body.id;

        const entity = this.userService.getOneById(id);

        return res.send({
            message: 'successful',
            entity: entity
        });
    }

    async getOneByEmail(req: Request, res: Response) {
        const email = req.body.email;

        const entity = this.userService.getOneByEmail(email);

        return res.send({
            message: 'successful',
            entity: entity
        });
    }

    async getList(req: Request, res: Response) {
        const entities = this.userService.getList();

        return res.send({
            message: 'succesful',
            entity: entities
        });
    }

    async createTopic(req: Request, res: Response) {
        const producer = kafka.producer()
        const topic = req.body.topic;
        const value = req.body.value;

        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                { value: JSON.stringify(value) },
            ],
        })
        console.log("it goes here");
        await producer.disconnect()

        return res.send({
            message: 'succesful',
        });
    }

    async create(req: Request, res: Response): Promise<any> {
        const entity = this.userService.create(req.body) as unknown as User;

        return res.send({
            message: 'succesful',
            entity: entity
        });
    }
}

export default UserController