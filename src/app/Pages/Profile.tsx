import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

import Logout from "@/src/components/Buttons/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';


import styled from 'styled-components';
import { useStreak } from "use-streak";
import tw from 'twrnc';
import HeatmapChart from '@/src/components/Frappe/heatmap';
import { app } from "@/config/firebase.config"
import { getAuth } from "firebase/auth";


const auth = getAuth(app);
const today = new Date();

const { currentCount } = useStreak(localStorage, today);


const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const avatar = defaultAvatar
const bio = "string"
const name = "name"
const Avatar = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-right: 20px;
`;

const Info = styled.div``;

const Name = styled.h1`
  margin: 0;
`;

const Bio = styled.p`
  margin: 5px 0;
`;
// const threeMonthsAgo = new Date();
// const startDate = threeMonthsAgo.setMonth(today.getMonth() - 3);
// const endDate = today;

const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

// Calculate the new month and year
let newMonth = month - 4;
let newYear = year;

if (newMonth < 0) {
  newYear -= 1;
  newMonth += 12;
}

const startDate = new Date(newYear, newMonth, day);
const endDate = new Date();  
console.log(startDate);

let data = {
  dataPoints: {
  },
  
  start: startDate, // a JS date object
  end: endDate,
};

// Example usage


export default function LogoutPage() {
  const [componentsList, setComponentsList] = useState(false);
 
  const toggleChat = () => {
    setComponentsList(!componentsList);

};
const [body_weight, setData] = React.useState([]);
const email = auth.currentUser?.email;
const getData = async () => {
  try {
    const res = (await axios.post(baseUrl + "/bw", {email})).data;
    
    if (res.length > 0) {
      const latestEntry = res[res.length - 1];
      console.log(latestEntry.weight)
      setData(latestEntry.weight)
    } else {
      console.log("else")
      setData(null) // No data found
    }
    
  } catch (error) {
    console.log(error)
    console.log("error")
  }
};

const [heatmapdata, setheatmapdata] = React.useState([]);
const getheatmap = async () => {
  try {
    const res = (await axios.post(baseUrl + "/daily_volume", {email})).data;
    
    setheatmapdata(res)
  } catch (error) {
    console.log(error)
  }
};
console.log("heatmap", heatmapdata)

//THE HEAT MAP NEEDS A TRIGGER TO UPDATE VALUES AND SHOW UP ONTHE SCREEN, EX: TYPING A COMMENT AND SAVING

heatmapdata.forEach(item => {
  const [timestamp, value] = item;
  data.dataPoints[timestamp] = value;
});
console.log(data.dataPoint)
useEffect(() => {
  getData(),
  getheatmap()
}, []);
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
      <Header>
      <Avatar src={avatar || defaultAvatar} alt="User Avatar" />
      <Info >
        <Name>{email}</Name>
        <Bio>Bio: {bio}</Bio>
        <text>Body weight: {body_weight}</text>
      </Info>
    </Header>
    <HeatmapChart data={data}></HeatmapChart>
    <div >
      Gym streak:
        <span style={{ fontSize: "3rem" }} role="img" aria-label="fire emoji">🔥</span>
        <p style={{ fontSize: "1.5rem" }}>
          {currentCount} days{currentCount > 1 ? "s" : ""}
        </p>
      </div>

      {componentsList ? ( <WebSocketCall  toggleChat={toggleChat}/>) : (
        <>
            <Logout />
          <Pressable onPress={toggleChat}>
            <View style={{ padding: 10, marginVertical: 10, backgroundColor: 'lightblue' }}>
              <Text style={{ fontSize: 16 }}>CHAT WITH SOMEONE</Text>
            </View>
          </Pressable>
        </>
      )}

    </ScrollView>
  );
}
