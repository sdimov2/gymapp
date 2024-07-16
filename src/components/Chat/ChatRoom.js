import tw from 'twrnc';

import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { io } from "socket.io-client";

import RoomCommunication from "@/src/components/Chat/WebSocket";

import { baseUrl } from "@/src/assets/constants/Fixed_Vars";

import { useCurrEmail } from '@/src/context/emailContext';


export default function WebSocketCall({ toggleChat  }) {
  const [socketInstance, setSocketInstance] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const [rooms, setRooms] = useState({});

  const { currEmail } = useCurrEmail();


  const exitAll = () => {
    if (currentRoom != "") handleLeaveRoom(currentRoom)
    toggleChat()
  }

  const handleClearRooms = () => {
    socketInstance.emit("clearRooms");
  }


  const handleJoinRoom = (roomID) => {
    if (socketInstance && roomID !== "" && currentRoom === "") {
      socketInstance.emit("join_room", { room: roomID });
      setCurrentRoom(roomID);
    }
  };

  const handleLeaveRoom = (roomID) => {
    if (socketInstance) {
      socketInstance.emit("leave_room", { room: roomID });
      setCurrentRoom("");
    }
  };


  useEffect(() => {      
      const socket = io(baseUrl, {
        reconnection: false,
      });

      setSocketInstance(socket);

      // Event listeners for socket events
      socket.on("connect1", () => {
        // console.log("Connected:", socket.id); // FIX: NOTIFICATION
      });

      socket.on("disconnect1", (data) => {
        // console.log("Disconnected:", data); // FIX: NOTIFICATION
      });


      socket.on("rooms", (data) => {
        // console.log("Available Rooms:", data.rooms); // FIX: NOTIFICATION
        setRooms(data.rooms);
      });

      return () => {
        socket.disconnect();
      };
  }, []);



  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      handleLeaveRoom(currentRoom)
    }
    
    // window.addEventListener('beforeunload', handleBeforeUnload)
  }, [currentRoom]);


  return (
    <>
      <View style={tw`flex mb-4 w-full`}>
        
        
        <View style={tw`flex-row p-2 mb-1 items-center justify-center justify-between bg-white`}>
          <Text style={tw`text-xl font-bold mb-1 `}>ChatRoom!</Text>

          <Pressable onPress={exitAll}>
            <View style={tw`bg-red-500 rounded-lg p-2`}>
              <Text style={tw`text-white text-center text-lg font-bold`}>Exit</Text>
            </View>
          </Pressable>

          {currentRoom === "" && currEmail === "gogineni.akhil@hotmail.com" && (
            <Pressable onPress={handleClearRooms}>
              <View style={tw`bg-red-500 rounded-lg p-2`}>
                <Text style={tw`text-white text-center text-lg font-bold`}>Clear</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>


      {/* Input to join or leave a room */}
      <View style={tw`flex-1 mb-4`}>
        {currentRoom === "" ? (
          <>
            <View style={tw`flex-row items-center mb-4`}>
              <Pressable 
                style={tw`border p-2 bg-gray-100 rounded-lg flex-1`}
                onPress={() => handleJoinRoom(currEmail)}
              >
                <Text style={tw`text-center text-lg text-gray-800`}>Create Room</Text>
              </Pressable>
            </View>

            <View>
              <Text style={tw`text-sm font-bold mb-2`}>Rooms:</Text>
              {/* <ScrollView style={tw`h-30`} showsVerticalScrollIndicator={false}> */}
                {Object.keys(rooms).map((roomKey) => (
                  <Pressable
                    key={roomKey}
                    onPress={() => handleJoinRoom(roomKey)}
                    style={tw`p-2 bg-gray-300 rounded-lg mb-2`}
                  >
                    <Text style={tw`text-gray-800`}>{roomKey}</Text>
                  </Pressable>
                ))}
              {/* </ScrollView> */}
            </View>
          </>
        ) : (
            <ScrollView style={tw`py-2 px-2 bg-gray-100 rounded-lg `}>
                <View style={tw`p-1 bg-yellow-400 rounded-t-lg`}>
                  <Text style={tw`text-lg font-bold text-center text-gray-800`}>ROOM: {currentRoom}</Text>
                </View>
                <RoomCommunication socket={socketInstance} room={currentRoom} currEmail={currEmail}/>
            </ScrollView>
        )}
      </View>
    </>

  );
}
