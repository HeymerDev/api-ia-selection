import express from "express";
import cors from "cors";
import yoloRoutes from "./routes/yoloRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/yolo", yoloRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor modularizado en http://localhost:${PORT}`);
});
