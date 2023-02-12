import { Volume } from "../../entities/volume";
import { IVolumeRepository } from "../interfaces/volume-repository.interface";

class VolumeRepository implements IVolumeRepository {

    private volumes: Volume[];

    constructor() {
        this.volumes = [];
    }


    async create(data: any): Promise<Volume> {
        const volume: Volume = {
            id: Math.floor(Math.random() * 2),
            ...data
        }

        this.volumes.push(volume);

        return volume;
    }

}

export { VolumeRepository }