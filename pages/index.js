import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LineChart from "../components/LineChart";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const EXAMPLE_DATA = {
  orders: [
    {
      symbol: "NVDA",
      price: "235.59",
      quantity: "213.25856385",
      date: "2023-03-03T18:34:56.631489763Z",
      side: "buy",
    },
    {
      symbol: "AAPL",
      price: "147.541928",
      quantity: "89.197865521",
      date: "2023-03-03T14:30:17.975331342Z",
      side: "sell",
    },
    {
      symbol: "AAPL",
      price: "144.29",
      quantity: "89.197865521",
      date: "2023-03-02T17:47:02.447697Z",
      side: "buy",
    },
    {
      symbol: "TSLA",
      price: "189.218825",
      quantity: "264.007021354",
      date: "2023-03-02T17:47:02.144033Z",
      side: "sell",
    },
    {
      symbol: "TSLA",
      price: "189.171327",
      quantity: "264.007021354",
      date: "2023-03-02T17:46:47.543871Z",
      side: "buy",
    },
    {
      symbol: "AAPL",
      price: "144.25",
      quantity: "346.222243304",
      date: "2023-03-02T17:45:52.504688Z",
      side: "sell",
    },
    {
      symbol: "AAPL",
      price: "144.31",
      quantity: "346.222243304",
      date: "2023-03-02T17:44:20.259983Z",
      side: "buy",
    },
    {
      symbol: "TSLA",
      price: "189.482407",
      quantity: "5.267974414",
      date: "2023-03-02T17:44:15.273436Z",
      side: "sell",
    },
    {
      symbol: "TSLA",
      price: "189.8",
      quantity: "5.267974414",
      date: "2023-03-02T17:40:29.583808Z",
      side: "buy",
    },
    {
      symbol: "AAPL",
      price: "144.337222",
      quantity: "339.241276654",
      date: "2023-03-02T17:40:30.852416Z",
      side: "sell",
    },
    {
      symbol: "AAPL",
      price: "144.44",
      quantity: "339.241276654",
      date: "2023-03-02T17:37:30.356358Z",
      side: "buy",
    },
    {
      symbol: "AAPL",
      price: "144.43",
      quantity: "6.922810661",
      date: "2023-03-02T17:37:29.544891Z",
      side: "sell",
    },
    {
      symbol: "AAPL",
      price: "144.45",
      quantity: "6.922810661",
      date: "2023-03-02T17:37:12.756387Z",
      side: "buy",
    },
    {
      symbol: "AAPL",
      price: "144.44",
      quantity: "1",
      date: "2023-03-02T17:37:12.176711Z",
      side: "sell",
    },
    {
      symbol: "AAPL",
      price: "144.43",
      quantity: "1",
      date: "2023-03-02T17:36:56.047726Z",
      side: "buy",
    },
  ],
  positions: [{ symbol: "NVDA", price: "235.76", quantity: "213.25856385" }],
  history: {
    timestamp: [1677718800, 1677805200, 1677868793],
    equity: [50000, 50000, 50277.83901347805],
    profit_loss: [0, 0, 181.81845530894],
    profit_loss_pct: [0, 0, 0.0036293991675011607],
    base_value: 50000,
    timeframe: "1D",
  },
};

export default function Home() {
  const [data, setData] = useState(null);

  async function fetchJson(
    url = "https://wsbdata.s3.amazonaws.com/orders.json"
  ) {
    //get the jason from the url
    const res = await fetch("https://wsbdata.s3.amazonaws.com/orders.json");
    const jsonResponse = await res.json();
    setData(jsonResponse);
  }

  useEffect(() => {
    fetchJson();
  }, []);

  function getProfitString() {
    const profit =
      data.history.profit_loss_pct[data.history.profit_loss_pct.length - 1];
    const profitCash =
      data.history.equity[data.history.equity.length - 1] - 50000;
    return `${profitCash > 0 ? "+" : ""}$${profitCash.toFixed(2)} (${
      profit > 0 ? "+" : ""
    }${((profitCash / 50000) * 100).toFixed(2)}%)`;
  }
  return (
    <>
      <Head>
        <title>Stonks Bot</title>
        <meta
          name="description"
          content="Keystone Science Fast Track To Cash"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen min-h-screen flex justify-start items-center flex-col pt-[100px] screen-content-width-two-third">
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 blur-md">
          <figure className="w-screen h-[46.8vw]">
            <Image src="/gradient_dark.jpg" alt="gradient dark" layout="fill" />
          </figure>
          <div className="w-full h-screen bg-jacarta-900">asdfasdf</div>
        </picture>
        <div className="w-full flex justify-center items-center ">
          <div className={styles.thirteen}>
            <Image
              src="/keystone.svg"
              alt="keystone_logo_solid"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white">Keystone Stonks Bot</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          Powered by{" "}
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/en/f/f0/WallStreetBets.png"
            }
            width={"70%"}
          />
        </div>
        {data && (
          <div className="justify-start items-start w-full max-w-[1100px]">
            <div>
              <h1
                className="text-2xl font-bold text-center"
                style={{
                  color: getProfitString().includes("-")
                    ? "#D50000"
                    : "#42f563",
                }}
              >
                {getProfitString()}
              </h1>
            </div>
            <History {...data} />
            <Orders orders={data?.orders} />
          </div>
        )}
      </main>
    </>
  );
}

//this function returns a list of all the orders in the data object
function Orders({ orders }) {
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    //make a copy of the orders array, and then sort it so that newest orders are first
    console.log("STARTING");
    const ordersCopy = [...orders];
    ordersCopy.sort((a, b) => {
      console.log(a.date);
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      console.log(
        "A Date: ",
        aDate,
        "B Date: ",
        bDate,
        "B - A: ",
        bDate - aDate
      );
      return bDate - aDate;
    });
    console.log(ordersCopy);
    setSortedOrders([...ordersCopy]);
  }, [JSON.stringify(orders)]);

  function cleanDateString(recordedDate) {
    const date = new Date(recordedDate);
    return date.toISOString().split("T")[0];
  }
  //filter out the orders that are not buy orders
  orders = orders.filter((order) => order.side === "buy");

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <div className="flex flex-col rounded-md bg-black/40 border-2 p-5 max-h-[500px] overflow-y-scroll">
        {sortedOrders.map((order, index) => (
          <div className="flex flex-row" key={index}>
            <div className="flex flex-col">
              <p className="text-white text-lg underline underline-offset-4">
                STOCK: {order.symbol}
              </p>
              <p className="text-white">PRICE: ${order.price}</p>
              <p className="text-white">QUANTITY: {order.quantity}</p>
              <p className="text-white">{cleanDateString(order.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//this function returns a list of all the orders in the data object
function History({ history }) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold text-white">Value</h1>
      <div className="flex flex-col rounded-md bg-black/40 border-2 p-5 max-h-[500px] overflow-y-scroll">
        <LineChart data={history} />
      </div>
    </div>
  );
}
