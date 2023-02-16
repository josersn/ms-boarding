import { Channel, connect, Connection } from "amqplib";

interface IPublish {
    exec(param): Promise<void>
}

class Publish implements IPublish {
    private connection: Connection;
    private channel: Channel;
    private connectionURL: string;
    constructor() {
        this.connectionURL = `amqp://admin:admin@localhost:5672`
    }

    async getConnection(): Promise<void> {
        this.connection = await connect(this.connectionURL);
        this.channel = await this.connection.createChannel();
    }

    async publishInQueue(queue: string, message: string) {
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async exec(params: any) {
        try {
            await this.getConnection();
            await (params.queue, params.message)
            console.log("Success to publish message")
        } catch (error) {
            console.log("Error to Publish Message")
        } finally {
            this.connection.close();
        }
    }
}

export { Publish, IPublish }