import { expect, it, beforeAll, afterAll, describe } from "vitest";
import request from "supertest";
import { app } from "../app";
import { execSync } from "node:child_process";
describe("Password Vault Tests", () => {
  let token: string;
  beforeAll(async () => {
    await app.ready();
    execSync("npm run knex migrate:latest");

    await request(app.server).post("/api/register").send({
      nome: "Vault User",
      email: "vault@test.com",
      password: "password123",
    });
    const loginResponse = await request(app.server).post("/api/login").send({
      email: "vault@test.com",
      password: "password123",
    });
    token = loginResponse.body.token;
    expect(loginResponse.body).toHaveProperty("token");
    console.log("Token recebido:", loginResponse.body.token);
  });
  afterAll(async () => {
    await app.close();
  });
  it("Criar nova senha", async () => {
    await request(app.server)
      .post("/api/create-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        service: "Test Service",
        password: "testpassword",
        notes: "Test notes",
      })
      .expect(201);
  });
  it("Não deve permitir criar senha sem token", async () => {
    await request(app.server)
      .post("/api/create-password")
      // Removemos o .set("Authorization", ...) de propósito
      .send({
        service: "Test Service",
        password: "testpassword",
        notes: "Test notes",
      })
      .expect(401); // 401 Unauthorized
  });
});
