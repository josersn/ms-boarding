import { IOrderService } from "../../../services/order.service";
import { IVolumeService } from "../../../services/volume.service";
import { IUseCase } from "../../interfaces/use-case.interface";

interface IRequest {
    document: string,
    email: string,
    name: string,
    volumes: number,
    address: string,
    number: string,
    city: string,
    state: string,
    zipCode: string,
    items: IRequestVolume[],
}

interface IRequestVolume {
    volume: number
}

type ICreateDeliveryUseCase = IUseCase<IRequest, any>;


class CreateDeliveryUseCase implements ICreateDeliveryUseCase {

    constructor(private orderService: IOrderService, private volumeService: IVolumeService) { }

    async exec(payload: IRequest | undefined): Promise<any> {




        return true;
    }
}


export { CreateDeliveryUseCase, ICreateDeliveryUseCase }
