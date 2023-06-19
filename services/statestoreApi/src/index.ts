import fastify, { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';

import { createState, getState } from './dapr/daprStates';

const app = fastify({ logger: true });

app.register(require('@fastify/cors'));

app.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    function (req, body, done) {
        try {
            var newBody = {
                raw: body,
                parsed: JSON.parse(body.toString()),
            };
            done(null, newBody);
        } catch (error: any) {
            error.statusCode = 400;
            done(error, undefined);
        }
    }
);

app.get('/', async (request, reply) => {
    return { hello: 'world' };
});

const schemaPostState: FastifySchema = {
    body: {
        type: 'object',
    },
};
app.post('/state/:type', { schema: schemaPostState }, async (request: FastifyRequest, reply: FastifyReply) => {

    app.log.debug(request, 'request object');
    const { type } = request.params as { type: string };
    const { raw, parsed } = request.body as { raw: string, parsed: object }
    await createState(type, parsed)
        .then(ret => {
            reply.send({ response: ret });
        })
        .catch(err => {
            reply.status(500).send({ error: err })
        })
});

const schemaGetState: FastifySchema = {

};

app.get('/state/:type', { schema: schemaGetState }, async (request: FastifyRequest, reply: FastifyReply) => {

    app.log.debug(request, 'request object');
    const { type } = request.params as { type: string};
    await getState(type)
        .then(ret => {
            reply.send({ response: ret })
            // return { response: ret};
        })
        .catch(err => {
            reply.status(500).send({ error: err });
        })
});



const start = async () => {
    try {
        const port = 3000
        await app.listen({ port });
        app.log.info(`server listening on ${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();