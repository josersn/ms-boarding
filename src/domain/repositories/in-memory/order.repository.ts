import { Order } from "../../entities/order";
import { IOrderRepository, OrderDTO } from "../interfaces/order-repository.interface";

class OrderRepository implements IOrderRepository {

    private orders: Order[];

    constructor() {
        this.orders = []
    }


    async create(data: OrderDTO): Promise<Order> {
        const order: Order = {
            id: Math.floor(Math.random() * 100),
            ...data,
            active: true
        }

        this.orders.push(order);

        return order;
    }
}

export { OrderRepository }