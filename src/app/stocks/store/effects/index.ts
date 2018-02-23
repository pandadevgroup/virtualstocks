import { PortfolioEffects } from "./portfolio.effects";
import { StocksDataEffects } from "./stocks-data.effects";
import { TransactionsEffects } from "./transactions.effects";

export const effects: any[] = [ PortfolioEffects, StocksDataEffects, TransactionsEffects ];

export * from "./portfolio.effects";
export * from "./stocks-data.effects";
export * from "./transactions.effects";
