import { Controller, POST } from "fastify-decorators";
import { FastifyReply } from "fastify/types/reply";
import { OrderService } from "../../application/services/order.service";
import { VolumeService } from "../../application/services/volume.service";
import { CreateDeliveryUseCase } from "../../application/use-cases/delivery/create-delivery/create-delivery.use-case";
import { OrderRepository } from "../database/prisma/repositories/order.repository.prisma";
import { VolumeRepository } from "../database/prisma/repositories/volume.repository.prisma";
import { authenticate } from "../middleware/auth";

@Controller("delivery")
export default class DeliveryController {

    @POST("/", {
        preValidation: authenticate
    })
    async createOrder(req, reply: FastifyReply) {
        try {
            const orderRepository = new OrderRepository();
            const volumeRepository = new VolumeRepository();
            const orderService = new OrderService(orderRepository);
            const volumeService = new VolumeService(volumeRepository);
            const useCase = new CreateDeliveryUseCase(orderService, volumeService);

            const order = await useCase.exec({
                delivery: req.body,
                user: req.user
            });

            return reply.status(201).send({
                message: "Order created",
                data: order

            })

        } catch (error: any) {
            return reply.status(error.code || 500).send({
                error: true,
                message: error.message || "Internal server error"
            })
        }
    }
}