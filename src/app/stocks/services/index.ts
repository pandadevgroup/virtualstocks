import { PortfolioService } from "./portfolio.service";
import { StocksService } from "./stocks.service";
import { OrdersService } from "./orders.service";

export const services: any[] = [ PortfolioService, StocksService, OrdersService ];

export * from "./portfolio.service";
export * from "./stocks.service";
export * from "./orders.service";
