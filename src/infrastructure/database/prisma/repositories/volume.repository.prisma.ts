import { prismaClient } from "..";
import { Volume } from "../../../../domain/entities/volume";
import { IVolumeRepository, VolumeDTO } from "../../../../domain/repositories/interfaces/volume-repository.interface";

class VolumeRepository implements IVolumeRepository {
    async create(volume: VolumeDTO): Promise<Volume> {
        // @ts-ignore
        return prismaClient.volume.create({
            data: {
                ...volume
            }
        });
    }
}

export { VolumeRepository }