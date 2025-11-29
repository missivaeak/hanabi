import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import path from "node:path";
import { HelloApiResponse } from "@repo/shared";

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(import.meta.dirname, "../www"),
  maxAge: "30d",
  immutable: true,
});

// Declare a route
fastify.get("/api/v1/hello", async function handler(request, reply) {
  const responseBody: HelloApiResponse = {
    hello: "world",
  };

  return responseBody;
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
