import { prismaClient } from "..";
import { Order } from "../../../../domain/entities/order";
import { IOrderRepository, OrderDTO } from "../../../../domain/repositories/interfaces/order-repository.interface";

class OrderRepository implements IOrderRepository {
    async create(order: OrderDTO): Promise<Order> {
        // @ts-ignore
        return prismaClient.order.create({
            data: {
                ...order
            }
        })
    }
}

export { OrderRepository }