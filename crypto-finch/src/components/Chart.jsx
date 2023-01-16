import React, { useEffect } from "react";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import {TradingViewStockChartWidget} from 'react-tradingview-components'

const Chart = () => {
  // useEffect(() => {
  //   const widget = window.TradingView;
  //   console.log(widget);
  //   // setInterval(() => {
  //   //   console.log(widget);
  //   //   if (widget) {
  //   //     console.log(widget.onready);

  //   //     widget.onready(() => {
  //   //       console.log("ready");
  //   //     });
  //   //   }
  //   // }, 100);
  // }, []);

  return (
    <div className="chart-container">
      {/* <TradingViewWidget
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
      /> */}
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