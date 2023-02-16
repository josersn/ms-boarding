import ApiError from "../../../core/api-error";
import { IOrderService } from "../../../services/order.service";
import { IVolumeService } from "../../../services/volume.service";
import { IUseCase } from "../../interfaces/use-case.interface";

interface IRequest {
    volumeId: number,
    orderId: number,
    user: any
}


type ICreateTagUseCase = IUseCase<IRequest, any>;

class CreateTagUseCase implements ICreateTagUseCase {

    constructor(private volumeService: IVolumeService, private orderService: IOrderService) { }

    async exec({ volumeId, orderId, user }: IRequest): Promise<any> {

        const order = await this.orderService.findById(orderId);

        if (!order) {
            throw new ApiError(404, 404, "Volume not found");
        }

        if (order.companyId !== user.companyId) {
            throw new ApiError(404, 404, "Volume not found");
        }

        const volume = await this.volumeService.findById(volumeId);

        if (!volume) {
            throw new ApiError(404, 404, "Volume not found");
        }

        return volume;
    }
}

export { CreateTagUseCase, ICreateTagUseCase }