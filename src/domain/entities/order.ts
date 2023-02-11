enum OrderStatus {
    CANCELED = 'CANCELED',
    PENDING = 'PENDING',
    RECEIVED = 'RECEIVED',
    REJECTED = 'REJECTED',
    DELIVERED = 'DELIVERED',
    TRANSFER = 'TRANSFER',
    DELIVERY = 'DELIVERY'
}

class Order {
    id: number;
    companyId: number;
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
    active: number;
}

export { Order, OrderStatus }