import mongoose from "mongoose";
import { setupDB } from "../config/db.config.js";

describe("Pruebas unitarias: Conexión a la base de datos", () => {
  beforeAll(async () => {
    await setupDB();
  });

  test("Debería conectar a la base de datos correctamente", async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = conectado
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Cierra la conexión después de las pruebas
  });
});
