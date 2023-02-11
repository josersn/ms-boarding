import { Volume, VolumeStatus } from "../../entities/volume";

interface IVolumeRepository {
    create(volume: VolumeDTO): Promise<Volume>
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