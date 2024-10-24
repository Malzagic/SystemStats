import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  title: string;
};

export function Chart({ data, maxDataPoints, title }: ChartProps) {
  const prepateData = useMemo(() => {
    const points = data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: maxDataPoints - points.length }).map(() => ({
        value: undefined,
      })),
    ];
  }, [data, maxDataPoints]);

  return <BaseChart data={prepateData} title={title} />;
}
