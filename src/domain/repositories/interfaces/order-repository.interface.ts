import { Order, OrderStatus } from "../../entities/order";

interface IOrderRepository {
    create(order: OrderDTO): Promise<Order>
};

interface OrderDTO {
    companyId: number;
    addressId: number;
    status: OrderStatus;
    email: string;
    name: string;
    volumes: number;
    dueDate: Date;
};

export { IOrderRepository, OrderDTO };