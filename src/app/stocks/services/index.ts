import { PortfolioService } from "./portfolio.service";
import { StocksService } from "./stocks.service";

export const services: any[] = [ PortfolioService, StocksService ];

export * from "./portfolio.service";
export * from "./stocks.service";
