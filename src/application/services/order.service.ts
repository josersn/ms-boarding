import { Order } from "../../domain/entities/order";
import { IOrderRepository, OrderDTO } from "../../domain/repositories/interfaces/order-repository.interface";

interface IOrderService {
    createOrder(order: OrderDTO): Promise<Order>
    findById(where: any): Promise<Order | undefined | null>
}

class OrderService implements IOrderService {

    constructor(private orderRepository: IOrderRepository) { }


    async createOrder(order: OrderDTO): Promise<Order> {
        return this.orderRepository.create(order)
    }

    async findById(volumeId: number): Promise<Order | null | undefined> {
        return this.orderRepository.findBy({
            where: {
                id: volumeId
            }
        });
    }

}

export { IOrderService, OrderService }