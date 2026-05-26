import { expect, it, beforeAll, afterAll, beforeEach, describe } from "vitest";
import request from "supertest";
import { execSync } from "node:child_process";
import { app } from "../app";

describe("Authentication Tests", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  beforeEach(async () => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });
  it("Cria uma nova conta de usuário", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Test User",
        email: "test@test.com.br",
        password: "password123",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          message: "Usuário criado com sucesso",
        });
      });
  });
  it("Realiza login com credenciais válidas", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Test User",
        email: "test@test.com.br",
        password: "password123",
      })
      .expect(201);
    await request(app.server)
      .post("/api/login")
      .send({
        email: "test@test.com.br",
        password: "password123",
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("token");
        console.log("Token recebido:", response.body.token);
      });
  });
  it("Cria um novo registro de senha", async () => {
    await request(app.server)
      .post("/api/register")
      .send({
        nome: "Test User",
        email: "test@test.com.br",
        password: "password123",
      })
      .expect(201);
    const loginResponse = await request(app.server)
      .post("/api/login")
      .send({
        email: "test@test.com.br",
        password: "password123",
      })
      .expect(200);
    const token = loginResponse.body.token;
    await request(app.server)
      .post("/api/create-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        service: "Test Service 2",
        password: "servicepassword123",
        notes: "Some notes about this password",
      })
      .expect(201);
  });
});
