import axios from 'axios';

import React, { PureComponent, useState, useEffect } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { baseUrl } from '@/src/constants/Fixed_Vars';


const BodyWeightGraph = () => {
    const [data, setData] = React.useState([]);
     
    const getData = async () => {
      try {
        const res = (await axios.get(baseUrl + "/bw")).data;
        setData(res)

      } catch (error) {
        console.log(error)
      }
    };

    useEffect(() => {
      getData()
    }, []);


    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 15 }}
        >
        
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="weight" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        
        </LineChart>
      </ResponsiveContainer>
    );
        
}


export default BodyWeightGraph;
