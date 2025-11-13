import { Request, Response } from "express";
import { register } from "../config/metrics";
import { metricsService } from "../services/metricsService";
import { logger } from "../config/logger";

export const getMetrics = async (_req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    logger.error(`Error fetching metrics: ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch metrics" });
  }
};

export const getMetricsSummary = async (_req: Request, res: Response) => {
  try {
    const data = await metricsService.getSummary();
    res.status(200).json({
      success: true,
      message: "Metrics summary retrieved",
      data,
    });
  } catch (error) {
    logger.error(`Error summarizing metrics: ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Error summarizing metrics" }); // Fixed message
  }
};
