import { PortfolioEffects } from "./portfolio.effects";
import { StocksDataEffects } from "./stocks-data.effects";

export const effects: any[] = [ PortfolioEffects, StocksDataEffects ];

export * from "./portfolio.effects";
export * from "./stocks-data.effects";
