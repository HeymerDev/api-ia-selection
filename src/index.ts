import express from "express";
import cors from "cors";
import yoloRoutes from "./routes/yoloRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import alineacionRoutes from "./routes/alineacionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/yolo", yoloRoutes);
app.use("/api/reportes", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alineaciones", alineacionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor modularizado en http://localhost:${PORT}`);
});
