import { Order } from "../../domain/entities/order";
import { IOrderRepository, OrderDTO } from "../../domain/repositories/interfaces/order-repository.interface";

interface IOrderService {
    createOrder(order: OrderDTO): Promise<Order>
}

class OrderService implements IOrderService {

    constructor(private orderRepository: IOrderRepository) { }


    async createOrder(order: OrderDTO): Promise<Order> {
        return this.orderRepository.create(order)
    }

}

export { IOrderService, IOrderRepository }