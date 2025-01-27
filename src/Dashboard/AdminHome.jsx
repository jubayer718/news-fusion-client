import React from 'react';
import Chart from 'react-google-charts';
import useArticles from '../Hooks/useArticles';

const AdminHome = () => {
  const [article] = useArticles()
   const publicationCounts = article.reduce((acc, article) => {
    acc[article.publisher] = (acc[article.publisher] || 0) + 1;
    return acc;
   }, {});
    const pieChartData = [["Publisher", "Number of Articles"]];
  const totalArticles = Object.values(publicationCounts).reduce(
    (sum, count) => sum + count,
    0
  );
    Object.entries(publicationCounts).forEach(([publisher, count]) => {
    const percentage = ((count / totalArticles) * 100).toFixed(2);
    pieChartData.push([`${publisher} (${percentage}%)`, count]);
  });

   // Static data for bar and line charts
  const barChartData = [
    ["Year", "Articles"],
    ["2021", 20],
    ["2022", 45],
    ["2023", 70],
    ["2024", 100],
  ];
  const lineChartData = [
    ["Month", "Views"],
    ["Jan", 100],
    ["Feb", 200],
    ["Mar", 300],
    ["Apr", 400],
  ];
    // Common chart styles
  const chartStyle = { width: "100%", height: "400px" };
  return (
    <div>
   


      {/* this chart is own */}
        <h1 className="text-3xl font-bold text-center">Publication Charts</h1>

      <Chart
        chartType="PieChart"
        data={pieChartData}
        options={{ title: "Publication Distribution", is3D: true }}
        {...chartStyle}
      />
          <Chart
        chartType="BarChart"
        data={barChartData}
        options={{ title: "Articles by Year", hAxis: { title: "Year" }, vAxis: { title: "Articles" } }}
        {...chartStyle}
      />

      <Chart
        chartType="LineChart"
        data={lineChartData}
        options={{ title: "Monthly Views", hAxis: { title: "Month" }, vAxis: { title: "Views" } }}
        {...chartStyle}
      />
    </div>
  );
};

export default AdminHome;