import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";

type BaseChartProps = {
  data: { value: number | undefined }[];
  title: string;
};

export function BaseChart({ data, title }: BaseChartProps) {
  return (
    <>
      {/* <Text
        x={0}
        y={20}
        width={500}
        textAnchor="middle"
        dominantBaseline="hanging"
        style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}
      >
        {title}
      </Text> */}
      <h3
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" fill="#1C1C1C" />
          <Area
            fillOpacity={0.3}
            type="monotone"
            dataKey="value"
            stroke="#5DD4EE"
            strokeWidth={3}
            fill="#0A4D5C"
            isAnimationActive={false}
          />
          <XAxis dataKey="value" stroke="transparent" height={0} />
          <YAxis
            domain={[0, 100]}
            stroke="#5DD4EE"
            width={50}
            tickFormatter={(tick) => `${tick}%`}
          />
          <Tooltip formatter={(value) => `${value}%`} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
