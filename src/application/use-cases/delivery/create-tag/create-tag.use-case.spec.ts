import { OrderRepository } from "../../../../domain/repositories/in-memory/order.repository";
import { VolumeRepository } from "../../../../domain/repositories/in-memory/volume.repository";
import { IOrderRepository } from "../../../../domain/repositories/interfaces/order-repository.interface";
import { IVolumeRepository } from "../../../../domain/repositories/interfaces/volume-repository.interface"
import ApiError from "../../../core/api-error";
import { IOrderService, OrderService } from "../../../services/order.service";
import { IVolumeService, VolumeService } from "../../../services/volume.service";
import { CreateDeliveryUseCase, ICreateDeliveryUseCase } from "../create-delivery/create-delivery.use-case";
import { CreateTagUseCase, ICreateTagUseCase } from "./create-tag.use-case.";

let useCase: ICreateTagUseCase;
let volumeRepository: IVolumeRepository;
let volumeService: IVolumeService;
let orderRepository: IOrderRepository;
let orderService: IOrderService;
let createDeliveryUseCase: ICreateDeliveryUseCase;
let order;

describe("Create Tag to volume", () => {

    const user = {
        id: 1,
        email: "mock_mail@mail.com",
        companyId: 1
    }

    const request = {
        document: "28113589000153",
        email: "jose.ramos@deliveryemail.com",
        name: "José Ramos",
        companyId: 1,
        volumes: 1,
        address: "Avenida Paulista",
        number: "1000",
        city: "São Paulo",
        state: "SP",
        zipCode: "04230423",
        items: [
            {
                volume: 1,
            }
        ],
    }

    beforeAll(async () => {
        volumeRepository = new VolumeRepository();
        volumeService = new VolumeService(volumeRepository);
        orderRepository = new OrderRepository();
        orderService = new OrderService(orderRepository)

        createDeliveryUseCase = new CreateDeliveryUseCase(orderService, volumeService);

        useCase = new CreateTagUseCase(volumeService, orderService);

    })

    it("Should be able to get a tag", async () => {
        const { volumes, ...order } = await createDeliveryUseCase.exec({
            delivery: request,
            user
        });

        const volume = volumes[0];

        const tag = await useCase.exec({
            orderId: order.id,
            volumeId: volume.id,
            user
        });

        expect(tag).toBeTruthy();
    });

    it("Should not be able to return a tag if order does not exists", async () => {

        const { volumes, ...order } = await createDeliveryUseCase.exec({
            delivery: request,
            user
        });

        const volume = volumes[0];

        const data = {
            orderId: 0,
            volumeId: volume.id,
            user
        }

        await expect(useCase.exec(data)).rejects.toThrowError(new ApiError(404,404, "Volume not found"));
    })
})