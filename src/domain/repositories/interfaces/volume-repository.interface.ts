import { Volume, VolumeStatus } from "../../entities/volume";

interface IVolumeRepository {
    create(volume): Promise<Volume>
}

interface VolumeDTO {
    orderId: number;
    status: VolumeStatus;
    volume: number;
}

export {
    IVolumeRepository,
    VolumeDTO
}