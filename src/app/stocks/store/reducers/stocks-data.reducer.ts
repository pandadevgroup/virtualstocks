import * as fromStocks from "../actions/stocks-data.actions";
import { BatchStockData, StockQuote, StockChart, StockSearchResult, StockCompanyInfo, StockDividendInfo, StockEarningsInfo, StockFinancialsInfo, StockNews, StockSplit, StockQueryRange, StockStats, StockSearchResults } from "@app/stocks/models";

export interface StocksDataState {
	batchStocksData: BatchStockData,
	stockQuote: StockQuote,
	stockChart: StockChart,
	stockCompanyInfo: StockCompanyInfo,
	stockDividendsInfo: StockDividendInfo[],
	stockEarningsInfo: StockEarningsInfo[],
	stockFinancialsInfo: StockFinancialsInfo[],
	stockNews: StockNews[],
	stockSplits: StockSplit[],
	stockSearchResults: StockSearchResults,
	stockStats: StockStats,
	stockQueryRange: StockQueryRange,
	error: any
}

export const initialState: StocksDataState = {
	batchStocksData: {},
	stockQuote: null,
	stockChart: null,
	stockCompanyInfo: null,
	stockDividendsInfo: [],
	stockEarningsInfo: [],
	stockFinancialsInfo: [],
	stockNews: [],
	stockSplits: [],
	stockSearchResults: null,
	stockQueryRange: "1m",
	stockStats: null,
	error: null
};

export function reducer(state = initialState, action: fromStocks.StocksDataAction): StocksDataState {
	switch (action.type) {
		case fromStocks.QUERY_BATCH_STOCK_PRICES_SUCCESS: {
			return {
				...state,
				batchStocksData: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_BATCH_STOCK_PRICES_FAIL: {
			return {
				...state,
				error: action.payload
			};
		}
		case fromStocks.QUERY_STOCK_INFO_SUCCESS: {
			return {
				...state,
				...action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_STOCK_INFO_FAIL: {
			return {
				...state,
				stockQuote: null,
				stockChart: null,
				error: action.payload
			};
		}
		case fromStocks.QUERY_STOCK_CHART: {
			return {
				...state,
				stockChart: null
			};
		}
		case fromStocks.QUERY_STOCK_CHART_SUCCESS: {
			return {
				...state,
				stockChart: action.payload,
				error: null
			};
		}
		case fromStocks.QUERY_STOCK_CHART_FAIL: {
			return {
				...state,
				stockChart: null,
				error: action.payload
			};
		}
		case fromStocks.CLEAR_STOCK_INFO: {
			return {
				...state,
				error: null,
				stockQuote: null,
				stockChart: null,
				stockCompanyInfo: null,
				stockDividendsInfo: [],
				stockEarningsInfo: [],
				stockFinancialsInfo: [],
				stockNews: [],
				stockSplits: [],
				stockStats: null
			};
		}
		case fromStocks.STOCK_SEARCH_SUCCESS: {
			return {
				...state,
				error: null,
				stockSearchResults: action.payload
			};
		}
		case fromStocks.STOCK_SEARCH_FAIL: {
			return {
				...state,
				error: action.payload
			}
		}
		case fromStocks.CLEAR_STOCK_SEARCH: {
			return {
				...state,
				error: null,
				stockSearchResults: null
			};
		}
		case fromStocks.SET_QUERY_RANGE: {
			return {
				...state,
				stockQueryRange: action.payload
			}
		}
	}
	return state;
}

export const getBatchStocksData = (state: StocksDataState) => state.batchStocksData;
export const getStockQuote = (state: StocksDataState) => state.stockQuote;
export const getStockChart = (state: StocksDataState) => state.stockChart;
export const getStockCompanyInfo = (state: StocksDataState) => state.stockCompanyInfo;
export const getStockDividendsInfo = (state: StocksDataState) => state.stockDividendsInfo;
export const getStockEarningsInfo = (state: StocksDataState) => state.stockEarningsInfo;
export const getStockFinancialsInfo = (state: StocksDataState) => state.stockFinancialsInfo;
export const getStockNews = (state: StocksDataState) => state.stockNews;
export const getStockSplits = (state: StocksDataState) => state.stockSplits;
export const getStocksError = (state: StocksDataState) => state.error;
export const getStockSearchResults = (state: StocksDataState) => state.stockSearchResults;
export const getStockQueryRange = (state: StocksDataState) => state.stockQueryRange;
export const getStockStats = (state: StocksDataState) => state.stockStats;
