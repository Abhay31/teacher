// import React from 'react';
// import { PieChart } from 'react-minimal-pie-chart';

// const Piechart = () => {
//     const data = [
//         { title: 'Seniority', value: 27, color: '#d38285' },
//         { title: 'Schools', value: 20, color: '#69b090' },
//         { title: 'Teachers', value: 30, color: '#70ccd4' },
//         { title: 'Talukas', value: 23, color: '#8987e0' },
//     ];

//     return (
//         <div className="col-md-4 col-sm-6 mb-4">
//             <div className="card card-custom-height1 rounded-3 text-black">
//                 <div className="card-body">
//                     <div className="chart-container mt-5">
//                         <PieChart
//                             data={data}
//                             label={({ dataEntry }) => `${dataEntry.title}`}
//                             labelStyle={(index) => ({
//                                 fill: data[index].color,
//                                 fontSize: '5px',
//                                 fontFamily: 'sans-serif',
//                                 fontWeight: 'bold',
//                             })}
//                             radius={42}
//                             labelPosition={112}
//                             animate
//                             animationDuration={1000}
//                             animationEasing="ease-out"
//                             style={{ height: '300px',marginTop:'30px' }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Piechart;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PieChart.css"; // Import the CSS file
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const data1 = {
    labels: ["Seniority", "School", "Teachers", "Talukas"],
    datasets: [
      {
        data: [27, 20, 30, 23],
        backgroundColor: ["#d38285", "#69b090", "#70ccd4", "#8987e0"],
        hoverBackgroundColor: ["#d38285", "#69b090", "#70ccd4", "#8987e0"],
      },
    ],
  };

  return (
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Distribution</h5>
              <Pie data={data1} />
            </div>
          </div>
        </div>
  );
};

export default PieChart;
