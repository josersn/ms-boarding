class Volume {
    id: number;
    orderId: number;
    status: VolumeStatus;
    volume: number;
    active: boolean;
}

enum VolumeStatus {
    RECEIVED = 'RECEIVED',
    LABELING = 'LABELING',
    SEPARATION = 'SEPARATION',
    DELIVERED = 'DELIVERED',
    TRANSFER = 'TRANSFER',
    DELIVERY = 'DELIVERY',
    COLLECT = 'COLLECT',
}

export { Volume, VolumeStatus }