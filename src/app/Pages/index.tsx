import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

import Logout from "@/src/components/Profile/Logout";
import WebSocketCall from "@/src/components/Chat/ChatRoom";

import { baseUrl } from '@/src/assets/constants/Fixed_Vars';
import { app } from "@/config/firebase.config";


export default function LogoutPage() {

  return (
    
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 12, backgroundColor: 'white' }}>
      
    </ScrollView>
  );
}
