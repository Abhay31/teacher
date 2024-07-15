import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Piechart = () => {
    const data = [
        { title: 'Seniority', value: 27, color: '#F3797E' },
        { title: 'Schools', value: 20, color: '#7978E9' },
        { title: 'Teachers', value: 30, color: '#70ccd4' },
        { title: 'Talukas', value: 23, color: '#4B49AC' },
    ];

    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card card-custom-height1 rounded-3 text-black">
                <div className="card-body">
                    <div className="chart-container mt-5">
                        <PieChart
                            data={data}
                            label={({ dataEntry }) => `${dataEntry.title}`}
                            labelStyle={(index) => ({
                                fill: data[index].color,
                                fontSize: '3.5px',
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                            })}
                            radius={42}
                            labelPosition={112}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Piechart;
