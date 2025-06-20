"use client";

import { currancyFormatter } from "@/app/lib/formatters";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip} from "recharts";



const MonthlyRevenueChart = ({data}: {data: {month: string, revenue: number}[]}) => {
  return (
        <div className="bg-white p-6 rounded-xl shadow-2xl shadow-gray-500/60 mt-10">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#000001"/>
              <YAxis dataKey="revenue" stroke="#000001"/>
              <Tooltip formatter={(revenue) => currancyFormatter(revenue as number)}/>
              <Line type="monotone" dataKey="revenue" stroke="#000001" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
}

export default MonthlyRevenueChart