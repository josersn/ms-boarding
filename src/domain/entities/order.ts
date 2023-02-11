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
    addressId: number;
    status: OrderStatus;
    email: string;
    name: string;
    volumes: number;
    dueDate: Date;
    active: number;
}