class Volume {
    id: number;
    orderId: number;
    status: VolumeStatus;
    volume: number;
    active: number;
}

enum VolumeStatus {
    RECEIVED = 'RECEIVED',
    LABELING = 'LABELING',
    SEPARATION = 'SEPARATION',
}