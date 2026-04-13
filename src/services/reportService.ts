import * as reporteModel from "../models/ReportModel.js";

export const registrarNuevoReporte = async (
  datos: reporteModel.IReporteTecnico,
) => {
  return await reporteModel.createReporte(datos);
};

export const obtenerTodosLosReportes = async () => {
  return await reporteModel.getAllReportes();
};
