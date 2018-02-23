import { PortfolioGuard } from "./portfolio.guard";
import { TransactionsGuard } from "./transactions.guard";

export const guards: any[] = [ PortfolioGuard, TransactionsGuard ];

export * from "./portfolio.guard";
export * from "./transactions.guard";
