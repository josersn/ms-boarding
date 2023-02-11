import { Volume } from "../../domain/entities/volume";
import { IVolumeRepository, VolumeDTO } from "../../domain/repositories/interfaces/volume-repository.interface";

interface IVolumeService {
    createVolume(volume: VolumeDTO): Promise<Volume>
}

class VolumeService implements IVolumeService {

    constructor(private volumeRepository: IVolumeRepository) { }

    async createVolume(volume: VolumeDTO): Promise<Volume> {
        return this.volumeRepository.create(volume);
    }
}

export { VolumeService, IVolumeService }