import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

import Logout from "@/src/components/Buttons/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { app } from "@/config/firebase.config";

import styled from 'styled-components';
import { useStreak } from "use-streak";
import tw from 'twrnc';
import HeatmapChart from '@/src/components/Frappe/heatmap';

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


const startDate = new Date('2024-01-01');  // Correct initialization from a date string
const endDate = new Date();  
let data = {
  dataPoints: {
      1426744959: 20,
      1463673055: 113,
      1476892421: 57,
  },
  start: startDate, // a JS date object
  end: endDate,
};

export default function LogoutPage() {
  const [componentsList, setComponentsList] = useState(false);
 
  const toggleChat = () => {
    setComponentsList(!componentsList);
  }
  return (
    
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
      <Header>
      <Avatar src={avatar || defaultAvatar} alt="User Avatar" />
      <Info >
        <Name>{name}</Name>
        <Bio>{bio}</Bio>
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
