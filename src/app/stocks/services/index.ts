import { PortfolioService } from "./portfolio.service";
import { StocksService } from "./stocks.service";
import { TransactionsService } from "./transactions.service";

export const services: any[] = [ PortfolioService, StocksService, TransactionsService ];

export * from "./portfolio.service";
export * from "./stocks.service";
export * from "./transactions.service";
