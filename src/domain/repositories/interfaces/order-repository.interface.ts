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
    address: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
};

export { IOrderRepository, OrderDTO };