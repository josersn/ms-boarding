import { OrderStatus } from "../../../../domain/entities/order";
import { VolumeStatus } from "../../../../domain/entities/volume";
import { IOrderService } from "../../../services/order.service";
import { IVolumeService } from "../../../services/volume.service";
import { IUseCase } from "../../interfaces/use-case.interface";

interface IRequest {
    document: string,
    companyId: number,
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

    async exec({ items, ...payload }: IRequest): Promise<any> {

        const order = await this.orderService.createOrder({
            status: OrderStatus.COLLECT,
            ...payload,
            dueDate: new Date()
        });


        const volumes = await Promise.all(
            items.map(async item => {
                return this.volumeService.createVolume({
                    orderId: order.id,
                    status: VolumeStatus.COLLECT,
                    volume: item.volume
                })
            })
        )



        return {
            ...order,
            volumes
        };
    }
}


export { CreateDeliveryUseCase, ICreateDeliveryUseCase }
