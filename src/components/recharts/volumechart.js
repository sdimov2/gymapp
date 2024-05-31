import React, { PureComponent, useState, useEffect } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const Volumegraph = (id, newdata) => {

  const [data, setData] = React.useState(
    [
        {
            x: 1,
            y: 1,
        },
        {
            x: 1,
            y: 2,
        },
    ]
);
const apiURL = "http://127.0.0.1:5000/get_pairs";
  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json);
        
      })
      .catch((error) => alert(error)) // display errors
  }, []);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
        
        </LineChart>
    </ResponsiveContainer>
    );
        
}


export default Volumegraph;
