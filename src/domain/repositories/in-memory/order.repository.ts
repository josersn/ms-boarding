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

    async findBy({ where }: any): Promise<Order | undefined> {
        const key = Object.keys(where)[0];
        const value = Object.values(where)[0];

        return this.orders.find(company => company[key] === value);
    }
}

export { OrderRepository }