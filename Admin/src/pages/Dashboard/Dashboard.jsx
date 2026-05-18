import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${url}/api/dashboard/stats`).then((res) => {
      if (res.data.success) setStats(res.data.data);
    });
  }, [url]);

  if (!stats) return <div className="dashboard"><p>Loading...</p></div>;

  const cards = [
    { label: "Total Orders", value: stats.totalOrders },
    { label: "Pending Orders", value: stats.pendingOrders },
    { label: "Total Foods", value: stats.totalFoods },
    { label: "Total Users", value: stats.totalUsers },
    { label: "Revenue", value: `$${stats.totalRevenue}` },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        {cards.map((c, i) => (
          <div key={i} className="dashboard-card">
            <p className="dashboard-card__label">{c.label}</p>
            <p className="dashboard-card__value">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
