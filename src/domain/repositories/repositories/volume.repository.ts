import { Volume } from "../../entities/volume";
import { IVolumeRepository } from "../interfaces/volume-repository.interface";

class VolumeRepository implements IVolumeRepository {

    private volumes: Volume[];

    constructor() {
        this.volumes = [];
    }


    async create(data: any): Promise<Volume> {
        const volume: Volume = {
            id: 1,
            ...data
        }

        this.volumes.push(volume);

        return volume;
    }

}

export { VolumeRepository }