import { Volume, VolumeStatus } from "../../entities/volume";

interface IVolumeRepository {
    create(volume: VolumeDTO): Promise<Volume>
    findBy(where: any): Promise<Volume | undefined | null>
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