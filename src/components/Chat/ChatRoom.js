import tw from 'twrnc';

import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { io } from "socket.io-client";

import RoomCommunication from "@/src/components/Chat/WebSocket";

import { baseUrl } from "@/src/assets/constants/Fixed_Vars";

import { getAuth } from "firebase/auth";
import { app } from "@/config/firebase.config";

const auth = getAuth(app);


export default function WebSocketCall({ toggleChat }) {
  const [socketInstance, setSocketInstance] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const [rooms, setRooms] = useState({});


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
        // console.log("Connected:", socket.id);
      });

      socket.on("disconnect1", (data) => {
        // console.log("Disconnected:", data);
      });


      socket.on("rooms", (data) => {
        // console.log("Available Rooms:", data.rooms);
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
    
    window.addEventListener('beforeunload', handleBeforeUnload)
  }, [currentRoom]);


  return (
    < >
      <View style={tw`flex space-x-4 mb-4`}>
        <Text style={tw`text-2xl font-bold mb-4`}>ChatRoom!</Text>
        
        <View style={tw`flex-row space-x-4 mb-4`}>
          <Pressable onPress={exitAll}>
            <View style={tw`p-4 bg-blue-500 rounded-lg`}>
              <Text style={tw`text-white text-center text-lg font-bold`}>GO BACK</Text>
            </View>
          </Pressable>

          {currentRoom === "" && auth.currentUser.email === "gogineni.akhil@hotmail.com" && (
            <Pressable onPress={handleClearRooms}>
              <View style={tw`p-4 bg-red-500 rounded-lg`}>
                <Text style={tw`text-white text-center text-lg font-bold`}>Clear</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {/* Input to join or leave a room */}
      <View style={tw`flex space-x-4 mb-4`}>
        {currentRoom === "" ? (
          <>
            <View style={tw`flex-row items-center mb-4 space-x-4`}>
              <Pressable 
                style={tw`border p-2 bg-gray-100 rounded-lg flex-1`}
                onPress={() => handleJoinRoom(auth.currentUser.email)}
              >
                <Text style={tw`text-center text-lg text-gray-800`}>Create Room</Text>
              </Pressable>
            </View>

            <View style={tw`mt-4`}>
              <Text style={tw`text-lg font-bold mb-2`}>Rooms:</Text>
              <ScrollView style={tw`max-h-40`}>
                {Object.keys(rooms).map((roomKey) => (
                  <Pressable
                    key={roomKey}
                    onPress={() => handleJoinRoom(roomKey)}
                    style={tw`p-2 bg-gray-300 rounded-lg mb-2`}
                  >
                    <Text style={tw`text-gray-800`}>{roomKey}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </>
        ) : (
          <View style={tw`p-4 bg-gray-100 rounded-lg`}>
            <View style={tw`bg-gray-100 mb-4 rounded-lg`}>
              <Pressable onPress={() => handleLeaveRoom(currentRoom)} 
                style={tw`w-2/5 p-2 bg-red-500 rounded-lg mb-2`}
              >
                <Text style={tw`text-white font-bold text-lg`}>Leave Room</Text>
              </Pressable>

              <View style={tw`p-2 bg-yellow-400 rounded-lg`}>
                <Text style={tw`text-2xl font-bold text-center text-gray-800`}>ROOM: {currentRoom}</Text>
              </View>
            </View>
            <RoomCommunication socket={socketInstance} room={currentRoom}/>
          </View>
        )}
      </View>
    </>

  );
}
