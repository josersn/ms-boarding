import { Volume } from "../../entities/volume";
import { IVolumeRepository } from "../interfaces/volume-repository.interface";

class VolumeRepository implements IVolumeRepository {

    private volumes: Volume[];

    constructor() {
        this.volumes = [];
    }


    async create(data: any): Promise<Volume> {
        const volume: Volume = {
            id: Math.floor(Math.random() * 100),
            ...data
        }

        this.volumes.push(volume);

        return volume;
    }

    async findBy({ where }: any): Promise<Volume | undefined> {
        const key = Object.keys(where)[0];
        const value = Object.values(where)[0];

        return this.volumes.find(company => company[key] === value);
    }

}

export { VolumeRepository }