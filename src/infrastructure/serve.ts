require('dotenv').config()
import fastify, { FastifyInstance as httpServerInstance } from "fastify";
import { bootstrap } from "fastify-decorators";
import { IncomingMessage, Server, ServerResponse } from "http";
import { resolve } from "path";
import "@fastify/jwt";

export type httpServer = httpServerInstance<Server, IncomingMessage, ServerResponse>;

declare module "@fastify/jwt" {
    interface FastifyJWT {
        id: number,
        email: string,
        companyId: number
    }
}

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
    await app.register(require("./middleware/auth"))
    await app.register(bootstrap, {
        directory: resolve(__dirname),
        mask: /\.controller\.[j|t]s$/
    })

    app.get("/", async (req, reply) => {
        reply.status(200).send("Welcome to Onboarding")
    })

    return app;
}