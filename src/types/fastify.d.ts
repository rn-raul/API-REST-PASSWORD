import fastify from "fastify";

declare module "fastify" {
  export interface FastifyRequest {
    user?: {
      id: string;
      nome: string;
      email: string;
      password_hash: string;
      created_at: string;
      updated_at: string;
    };
  }
}
