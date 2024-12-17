import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import path from "path";
import { setupDB } from "./config/db.config.js";
import { createRoles, createUsers } from "./config/initialSetup.js";
import indexRoutes from "./routes/index.routes.js";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", indexRoutes);

export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Un usuario conectado:", socket.id);

  socket.on("join", (colaboradorId) => {
    socket.join(colaboradorId);
    console.log(`Colaborador ${colaboradorId} se ha unido a su sala.`);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ error: "Error interno del servidor", details: err.message });
});

const startServer = async () => {
  try {
    await setupDB();
    console.log("Conexión a la base de datos establecida");

    await createRoles();
    await createUsers();
    console.log("Roles y usuarios iniciales creados");

    httpServer.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();

export { app, httpServer };

