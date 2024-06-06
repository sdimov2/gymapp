import { PureComponent, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { baseUrl } from '@/src/constants/Fixed_Vars';

import axios from 'axios';
import tw from 'twrnc'

export default function Volumegraph() {

  const [data, setData] = useState([]);
    const getData = async () => {
      try {
        const res = (await axios.get(baseUrl + "/get_pairs")).data;
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
          width={730} 
          height={250} 
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >

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
