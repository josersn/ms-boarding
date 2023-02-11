import fastify, { FastifyInstance as httpServerInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";


export type httpServer = httpServerInstance<Server, IncomingMessage, ServerResponse>;

async function server(): Promise<httpServer> {
    return fastify({
        requestTimeout: 30,
        logger: true,
        trustProxy: true
    })
}


export default async () => {

    const app = await server();

    await app.register(require('@fastify/formbody'));
    await app.register(require('@fastify/cors'), {
        origin: "*"
    });

    app.get("/", async (req, reply) => {
        reply.status(200).send("Welcome to Onboarding")
    })

    return app;
}