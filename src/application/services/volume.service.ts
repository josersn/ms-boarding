import { Volume } from "../../domain/entities/volume";
import { IVolumeRepository, VolumeDTO } from "../../domain/repositories/interfaces/volume-repository.interface";

interface IVolumeService {
    createVolume(volume: VolumeDTO): Promise<Volume>;
    findById(volumeId: number): Promise<Volume | null | undefined>
}

class VolumeService implements IVolumeService {

    constructor(private volumeRepository: IVolumeRepository) { }

    async createVolume(volume: VolumeDTO): Promise<Volume> {
        return this.volumeRepository.create(volume);
    }

    async findById(volumeId: number): Promise<Volume | null | undefined> {
        return this.volumeRepository.findBy({
            where: {
                id: volumeId
            }
        });
    }
}

export { VolumeService, IVolumeService }