"use client";

import {PieChart, Pie,ResponsiveContainer, Tooltip, Legend, Cell} from  "recharts"

const COLORS = ["#1A1A1D", "#3B1C32", "#6A1E55", "#A64D79", "#2E073F"];

const OrdersStatusChart = ({data}: {data: {name: string, value: number}[]}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl shadow-gray-500/60 mt-10">
      <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  )
}

export default OrdersStatusChart
