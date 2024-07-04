import React, { useEffect } from 'react';
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

const HeatmapChart = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById('heatmap-container');
    const chart = new Chart(container, {
      type: 'heatmap',
      data: {
        dataPoints: data.dataPoints,
        start: data.start,
        end: data.end,
      },
    });
    // Cleanup on component unmount
    return () => {
      chart.destroy();
    };
  }, [data]); // Re-run effect if data changes

  return (
    <div id="heatmap-container"></div>
  );
};
export default HeatmapChart;