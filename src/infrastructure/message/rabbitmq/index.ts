import { IPublish, Publish } from "./publisher";

interface IMessageBroker {
    publish(queue: string, message: any): Promise<void>
}

class MessageBroker implements IMessageBroker {

    private publishService: IPublish;

    constructor() {
        this.publishService = new Publish();
    }

    async publish(queue: string, message: any): Promise<void> {
        await this.publishService.exec({
            queue,
            message
        });
    }

}

export { MessageBroker, IMessageBroker }