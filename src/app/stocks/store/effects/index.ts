import { PortfolioEffects } from "./portfolio.effects";
import { StocksDataEffects } from "./stocks-data.effects";
import { OrdersEffects } from "./orders.effects";

export const effects: any[] = [ PortfolioEffects, StocksDataEffects, OrdersEffects ];

export * from "./portfolio.effects";
export * from "./stocks-data.effects";
export * from "./orders.effects";
