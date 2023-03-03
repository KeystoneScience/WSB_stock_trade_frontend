import ScaleLoader from "react-spinners/ScaleLoader";

import { ResponsiveLine } from "@nivo/line";
import { Defs, linearGradientDef } from "@nivo/core";

function formatData(data) {
  const dataObj = {};
  if (data?.timestamp) {
    //for each each element in the data array
    const points = [];

    for (let i = 0; i < data.timestamp.length; i++) {
      const unformattedDate = new Date(data.timestamp[i] * 1000);
      const formattedDate = `${
        unformattedDate.getMonth() + 1
      }/${unformattedDate.getDate()}/${unformattedDate.getFullYear()}`;
      points.push({
        x: formattedDate,
        y: data.equity[i],
      });
    }
    dataObj.id = "Equity";
    dataObj.data = points;
    dataObj.color = "hsl(116, 70%, 50%)";

    return [dataObj];
  }
  return [];
}
export default function SimpleGraphReport({ data }) {
  return (
    <div className="flex flex-col justify-end items-center h-52 relative">
      {data != null && (
        <div className="w-full h-full text-white">
          <ResponsiveLine
            data={formatData(data)}
            margin={{ top: 10, right: 10, bottom: 10, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            sliceTooltip={({ slice }) => {
              console.log(slice);
              return (
                <div className="bg-jacarta-500 p-2 rounded-md">
                  <div>${slice.points[0].data.yFormatted}</div>
                  <div>{slice.points[0].data.x}</div>
                </div>
              );
            }}
            enableGridY={false}
            enableGridX={false}
            enableSlices="x"
            colors={
              data?.equity[data?.equity?.length - 1] < 50000
                ? ["#D50000"]
                : ["#42f563"]
            }
            yFormat=" >-.2f"
            curve="linear"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              textColor: "white",
              tickValues: 3,
            }}
            defs={[
              linearGradientDef("gradientA", [
                { offset: 0, color: "inherit" },
                { offset: 10, color: "inherit", opacity: 0 },
              ]),
            ]}
            enableArea={true}
            pointSize={10}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={
              data?.equity[data?.equity?.length - 1] < 50000
                ? ["#D50000"]
                : ["#42f563"]
            }
            pointLabelYOffset={-12}
            useMesh={true}
            theme={{
              fontSize: "14px",
              textColor: "white",
            }}
          />
        </div>
      )}
      <div className="flex absolute justify-center items-center h-full w-full pointer-events-none">
        <ScaleLoader color={"#9000A0"} loading={data == null} size={150} />
      </div>
    </div>
  );
}
