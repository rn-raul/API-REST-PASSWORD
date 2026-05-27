import { it, beforeAll, afterAll, beforeEach, describe } from "vitest";
import request from "supertest";
import { execSync } from "node:child_process";
import { app } from "../app";
import { knex } from "../database";

describe("Authentication Tests", () => {
  beforeAll(async () => {
    await app.ready();
    execSync("npm run knex migrate:latest");
  });
  afterAll(async () => {
    await app.close();
  });
  beforeEach(async () => {
    await knex("users").del();
  });
  it("Cria uma nova conta de usuário", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Test User",
        email: "test2@test.com.br",
        password: "password123",
      })
      .expect(201);
  });
  it("Realiza login com credenciais válidas", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Test User",
        email: "test2@test.com.br",
        password: "password123",
      })
      .expect(201);
    await request(app.server)
      .post("/api/login")
      .send({
        email: "test2@test.com.br",
        password: "password123",
      })
      .expect(200);
  });
});
