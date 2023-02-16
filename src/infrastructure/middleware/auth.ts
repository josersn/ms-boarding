import fastifyPlugin from "fastify-plugin";
import { FastifyRequest, FastifyReply } from "fastify"


const authMiddleware = fastifyPlugin(async function (fastify, options) {
    fastify.register(require("@fastify/jwt"), {
        secret: process.env.SECRET,
        messages: {
            badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
            noAuthorizationInHeaderMessage: 'Autorization header is missing!',
            authorizationTokenExpiredMessage: 'Authorization token expired',
            authorizationTokenInvalid: (err) => {
                return `Authorization token is invalid: ${err.message}`
            }
        }
    });

});

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const user = await request.jwtVerify();

        request.user = user;
    } catch (error) {
        return reply.send(error)
    }
}


export default authMiddleware