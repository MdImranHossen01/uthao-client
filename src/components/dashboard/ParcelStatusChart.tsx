import { TParcel } from "@/types";
import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type ChartData = {
  name: string;
  value: number;
};

const COLORS = {
  pending: '#FBBF24', // amber-400
  'in-transit': '#3B82F6', // blue-500
  delivered: '#22C55E', // green-500
  cancelled: '#EF4444', // red-500
};

export default function ParcelStatusChart({ parcels }: { parcels: TParcel[] }) {
  const chartData: ChartData[] = useMemo(() => {
    if (!parcels) return [];

    const statusCounts = parcels.reduce((acc, parcel) => {
      acc[parcel.status] = (acc[parcel.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  }, [parcels]);

  if (!parcels || parcels.length === 0) {
    return (
      <div className="card bg-base-100 shadow-md">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Parcel Status Distribution</h2>
          <p>No parcel data available to display chart.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-md">
       <div className="card-body items-center">
        <h2 className="card-title mb-4">Parcel Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={(entry) => `${entry.name} (${entry.value})`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}