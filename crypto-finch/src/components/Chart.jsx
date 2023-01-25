import React, { useEffect } from "react";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import {TradingViewStockChartWidget} from 'react-tradingview-components'
import { useHistory } from "react-router-dom";


const Chart = () => {
    const history = useHistory();

  const auth = localStorage.getItem('token');
  // console.log('auth', auth);
  
  if (!auth || auth === 'undefined') {
    history.push("/login");
  }

  return (
    <div className="chart-container">
      
      <TradingViewStockChartWidget 
              symbol={"BINANCE:BTCUSDT"}
              theme={Themes.DARK}
              interval="D"
              locale="en"
              timezone="Etc/UTC"
              hide_side_toolbar={false}
              toolbar_bg="#f1f3f6"
              allow_symbol_change={true}
              withdateranges={true}
              autosize
              details={true}
              news={["headlines"]}
              watchlist={[
                "BINANCE:BTCUSDT",
                "BINANCE:ETHUSDT",
                "BINANCE:BNBUSDT",
                "BINANCE:XRPUSDT",
                "BINANCE:ADAUSDT",
                "BINANCE:SOLUSDT",
                "BINANCE:DOGEUSDT",
                "BINANCE:DOTUSDT",
                "BINANCE:LINKUSDT",
                "BINANCE:MATICUSDT",
                "BINANCE:SHIBUSDT",
                "BINANCE:TRXUSDT",
                "BINANCE:UNIUSDT",
                "BINANCE:ATOMUSDT",
                "BINANCE:AVAUSDT",
                "BINANCE:LTCUSDT",
                "BINANCE:FTTUSDT",
                "BINANCE:XMRUSDT",
                "BINANCE:ALGOUSDT",
                "BINANCE:XLMUSDT",
                "BINANCE:NEARUSDT",
                "BINANCE:BCHUSDT",
                "KUCOIN:CROUSDT",
                "BINANCE:MANAUSDT",
                "BINANCE:VETUSDT",
                "BINANCE:XTZUSDT",
                "BINANCE:SANDUSDT",
                "BINANCE:EOSUSDT",
                "BINANCE:HBARUSDT",
                "BINANCE:THETAUSDT",
                "BINANCE:AAVEUSDT",
              ]}
            />
    </div>
  )
}

export default Chart;