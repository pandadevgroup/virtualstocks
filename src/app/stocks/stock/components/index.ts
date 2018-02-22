import { StockDetailComponent } from "./stock-detail/stock-detail.component";
import { StockActionsComponent } from "./stock-actions/stock-actions.component";
import { StockTransactionDialog } from "./stock-transaction/stock-transaction.dialog";

export const components: any[] = [ StockDetailComponent, StockActionsComponent, StockTransactionDialog ];
export const entryComponents: any[] = [ StockTransactionDialog ];

export * from "./stock-detail/stock-detail.component";
export * from "./stock-actions/stock-actions.component";
export * from "./stock-transaction/stock-transaction.dialog";
