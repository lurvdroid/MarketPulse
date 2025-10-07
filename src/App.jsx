/*
MarketPulse - Single-file React App (App.jsx)

How to use:
1. Create a React app (e.g. with create-react-app or Vite).
2. Install dependencies:
   npm install recharts framer-motion @heroicons/react @headlessui/react
3. Setup Tailwind (follow Tailwind docs). Ensure index.css imports Tailwind:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
4. Replace your src/App.jsx with this file's contents and import any icons used.
5. Run the app: npm start

This file contains a polished, responsive marketing dashboard layout with:
- Sidebar navigation
- Top navbar with quick controls
- Metric cards (KPI)
- Interactive charts using Recharts
- Campaign table
- Export / share buttons (UI only)

Feel free to split components into separate files once you're happy with the UI.
*/

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { MenuIcon, ChartBarIcon, CogIcon, BellIcon, ShareIcon } from '@heroicons/react/outline';

const kpiData = [
  { id: 1, title: 'Revenue', value: '$24.3K', change: '+8.2%' },
  { id: 2, title: 'New Users', value: '4,512', change: '+4.7%' },
  { id: 3, title: 'CTR', value: '3.8%', change: '+0.6%' },
  { id: 4, title: 'CAC', value: '$12.40', change: '-5.1%' },
];

const trafficData = [
  { name: 'Jan', visitors: 4000, conversions: 240 },
  { name: 'Feb', visitors: 3000, conversions: 139 },
  { name: 'Mar', visitors: 2000, conversions: 980 },
  { name: 'Apr', visitors: 2780, conversions: 390 },
  { name: 'May', visitors: 1890, conversions: 480 },
  { name: 'Jun', visitors: 2390, conversions: 380 },
  { name: 'Jul', visitors: 3490, conversions: 430 },
  { name: 'Aug', visitors: 4000, conversions: 500 },
  { name: 'Sep', visitors: 4500, conversions: 520 },
];

const campaignData = [
  { id: 'CMP-001', name: 'Summer Promo', channel: 'Email', budget: '$1,200', spent: '$860', status: 'Active', ctr: '3.1%' },
  { id: 'CMP-002', name: 'Back to School', channel: 'Social', budget: '$2,400', spent: '$2,300', status: 'Paused', ctr: '2.5%' },
  { id: 'CMP-003', name: 'Holiday Sale', channel: 'Search', budget: '$3,800', spent: '$1,900', status: 'Draft', ctr: '4.0%' },
  { id: 'CMP-004', name: 'Referral Drive', channel: 'Organic', budget: '$500', spent: '$120', status: 'Active', ctr: '5.6%' },
];

const channelBreakdown = [
  { name: 'Social', value: 400 },
  { name: 'Search', value: 300 },
  { name: 'Email', value: 300 },
  { name: 'Direct', value: 200 },
];

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white/60 backdrop-blur-sm border-b">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <MenuIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">MarketPulse</h1>
        <span className="text-sm text-gray-500">Interactive Marketing Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 bg-gray-50 p-2 rounded-md">
          <input className="bg-transparent outline-none text-sm" placeholder="Search campaigns, metrics..." />
        </div>
        <button className="p-2 rounded-md hover:bg-gray-100"><BellIcon className="h-6 w-6 text-gray-600" /></button>
        <button className="p-2 rounded-md hover:bg-gray-100"><ShareIcon className="h-6 w-6 text-gray-600" /></button>
        <button className="p-2 rounded-md hover:bg-gray-100"><CogIcon className="h-6 w-6 text-gray-600" /></button>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-60 bg-white/70 border-r p-4 hidden md:block">
      <nav className="flex flex-col gap-2">
        <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
          <ChartBarIcon className="h-5 w-5 text-indigo-600" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">Campaigns</a>
        <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">Channels</a>
        <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">Audience</a>
        <a className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">Reports</a>
      </nav>

      <div className="mt-6">
        <h3 className="text-sm text-gray-500">Quick Actions</h3>
        <div className="flex flex-col gap-2 mt-2">
          <button className="text-sm py-2 px-3 rounded-md bg-indigo-600 text-white">Create Campaign</button>
          <button className="text-sm py-2 px-3 rounded-md border">Import Data</button>
        </div>
      </div>
    </aside>
  );
}

function MetricCard({ item }) {
  const trendPositive = item.change.startsWith('+');
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-4 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-500">{item.title}</h4>
          <div className="text-2xl font-semibold mt-1">{item.value}</div>
        </div>
        <div className={`text-sm font-medium ${trendPositive ? 'text-green-600' : 'text-red-500'}`}>
          {item.change}
        </div>
      </div>
    </motion.div>
  );
}

function TrafficChart() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border h-72">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Visitors & Conversions</h3>
        <div className="text-xs text-gray-500">Last 9 months</div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={trafficData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5'" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4F46E5'" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="visitors" stroke="#4F46E5" fillOpacity={0.15} />
          <Line type="monotone" dataKey="conversions" stroke="#10B981" dot />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChannelPie() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <h3 className="text-sm font-medium mb-3">Channel Breakdown</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={channelBreakdown} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} label>
              {channelBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CampaignsTable() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Campaigns</h3>
        <div className="flex items-center gap-2">
          <button className="text-sm py-1 px-3 rounded-md border">Export</button>
          <button className="text-sm py-1 px-3 rounded-md bg-indigo-600 text-white">New Campaign</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="py-2">Campaign</th>
              <th>Channel</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Status</th>
              <th>CTR</th>
            </tr>
          </thead>
          <tbody>
            {campaignData.map(c => (
              <tr key={c.id} className="border-t">
                <td className="py-2 font-medium">{c.name} <div className="text-xs text-gray-400">{c.id}</div></td>
                <td>{c.channel}</td>
                <td>{c.budget}</td>
                <td>{c.spent}</td>
                <td><span className={`px-2 py-1 rounded-full text-xs ${c.status === 'Active' ? 'bg-green-100 text-green-700' : c.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span></td>
                <td>{c.ctr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MarketPulseApp() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              {kpiData.map(k => (
                <MetricCard key={k.id} item={k} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <TrafficChart />
                <div className="mt-4">
                  <CampaignsTable />
                </div>
              </div>

              <div className="space-y-4">
                <ChannelPie />

                <div className="bg-white rounded-2xl p-4 shadow-sm border">
                  <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>• Email list synced (2,300 new subscribers)</li>
                    <li>• "Summer Promo" campaign updated by Alex</li>
                    <li>• A/B test for Search ads reached 10k impressions</li>
                  </ul>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      <footer className="text-xs text-gray-500 p-4 text-center">
        Built with ♥ by you — MarketPulse sample UI
      </footer>
    </div>
  );
}
