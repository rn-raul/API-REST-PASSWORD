import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function getPasswordById(request: FastifyRequest, reply: FastifyReply) {
    const paramSchema = z.object({
        id: z.string(),
    });
    const { id } = paramSchema.parse(request.params);

}