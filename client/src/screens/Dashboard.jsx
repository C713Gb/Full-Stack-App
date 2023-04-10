import React, { useEffect, useState } from "react";
import { URL } from "../APIUtils";
import axios from "axios";

import Calendar from "react-select-date";

import CanvasJSReact from "../canvasjs.react";
import { useSelector } from "react-redux";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const selector = useSelector((state) => state.user.user);

  const [symbol, setSymbol] = useState("NIFTY 50");
  const [fromDate, setFromDate] = useState("2017-01-02");
  const [toDate, setToDate] = useState("2017-04-20");

  const [data, setData] = useState([
    { x: new Date("2017-01-01"), y: 8179.5 },
    { x: new Date("2017-01-02"), y: 8192.25 },
    { x: new Date("2017-01-03"), y: 8190.5 },
    { x: new Date("2017-01-04"), y: 8273.8 },
    { x: new Date("2017-01-05"), y: 8243.8 },
    { x: new Date("2017-01-08"), y: 8236.05 },
  ]);
  const [loading, setLoading] = useState(true);

  const options = {
    animationsEnabled: true,
    theme: "light2",
    title: {
      text: "Nifty Index",
    },
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Closing Price (in EUR)",
      valueFormatString: "€##0.00",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return "€" + CanvasJS.formatNumber(e.value, "##0.00");
        },
      },
    },
    data: [
      {
        type: "area",
        xValueFormatString: "DD MMM",
        yValueFormatString: "€##0.00",
        dataPoints: data,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        `${URL}/historical-data?symbol=${symbol}&from_date=${fromDate}&to_date=${toDate}`
      )
      .then(({ data }) => {
        let arr = [];

        data.data.forEach((item) => {
          let temp = {
            x: new Date(item.x),
            y: item.y,
          };

          arr.push(temp);
        });

        setData(arr);
        setLoading(false);
      });
  }, [symbol, fromDate, toDate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <div
          style={{
            flex: 1,
          }}
        >
          <CanvasJSChart
            options={options}
            key={data}
            /* onRef = {ref => this.chart = ref} */
          />

          <div
            style={{
              flex: 1,
              flexDirection: "row",
              display: "flex",
            }}
          >
            <label for="stock-select">Choose a Stock:</label>

            <div
              style={{
                height: 80,
                width: 160,
              }}
            >
              <select
                name="stock"
                id="stock-select"
                onChange={(val) => setSymbol(val.target.value)}
                value={symbol}
              >
                <option value="">--Please choose an option--</option>
                <option value="NIFTY 50">NIFTY 50</option>
                <option value="NIFTY BANK">NIFTY BANK</option>
              </select>
            </div>

            <Calendar onSelect={(date) => setFromDate(date.toISOString())} minDate="2017-01-01" maxDate="2021-12-31"/>

            <Calendar onSelect={(date) => setToDate(date.toISOString())} minDate={fromDate} maxDate="2021-12-31" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
