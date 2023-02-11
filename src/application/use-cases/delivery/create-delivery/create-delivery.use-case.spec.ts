import { IOrderRepository } from "../../../../domain/repositories/interfaces/order-repository.interface";
import { IVolumeRepository } from "../../../../domain/repositories/interfaces/volume-repository.interface";
import { OrderRepository } from "../../../../domain/repositories/repositories/order.repository";
import { VolumeRepository } from "../../../../domain/repositories/repositories/volume.repository";
import { IOrderService, OrderService } from "../../../services/order.service";
import { IVolumeService, VolumeService } from "../../../services/volume.service";
import { CreateDeliveryUseCase, ICreateDeliveryUseCase } from "./create-delivery.use-case";

let useCase: ICreateDeliveryUseCase;
let orderService: IOrderService;
let volumeService: IVolumeService;
let orderRepository: IOrderRepository;
let volumeRepository: IVolumeRepository;


describe("Create delivery test", () => {

    beforeEach(() => {
        orderRepository = new OrderRepository();
        volumeRepository = new VolumeRepository();
        orderService = new OrderService(orderRepository);
        volumeService = new VolumeService(volumeRepository);
        useCase = new CreateDeliveryUseCase(orderService, volumeService);
    })

    it("Should be able to create a delivery", async () => {

        const data = {
            document: "28113589000153",
            email: "jose.ramos@deliveryemail.com",
            name: "José Ramos",
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

        const result = await useCase.exec(data);

        expect(result).toBeTruthy();

    })
})