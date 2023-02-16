import fastifyPlugin from "fastify-plugin";



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

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
});


export { authMiddleware }