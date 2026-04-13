import * as reporteModel from "../models/ReportModel.js";

export const registrarNuevoReporte = async (
  datos: reporteModel.IReporteTecnico,
) => {
  return await reporteModel.createReporte(datos);
};
