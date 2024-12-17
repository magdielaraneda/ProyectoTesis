import request from "supertest";
import { app } from '../index.js';

describe("Pruebas de integración: Endpoint de login", () => {
  it("Debería retornar un token al iniciar sesión con credenciales válidas", async () => {
    const res = await request(app)
      .post("/api/auth/login") // Ajusta la ruta para que coincida con la configurada en el servidor
      .send({ email: "admin@email.com", password: "admin123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined(); // Ajusta para que coincida con la estructura de respuesta
  });
});
