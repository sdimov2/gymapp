import tw from "twrnc";

import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";

import { getAuth } from "firebase/auth";
import { app } from "@/config/firebase.config";

const auth = getAuth(app);


export default function RoomCommunication({ socket, room}) {
    const [inputText, setInputText] = useState([]);
    const [messages, setMessages] = useState([]);

    // Function to handle text input change
    const handleText = (text) => {
        setInputText(text);
    };

    // Function to handle form submission (sending message)
    const handleSubmit = () => {
        if (!inputText.trim()) return;
        
        socket.emit("send_message", {
            email: auth.currentUser.email,
            message: inputText,
            room,
            socketID: socket.id,
        });

        // setMessage("");
    };

    useEffect(() => {
        // Function to handle incoming messages
        const handleMessage = (data) => {
            
            setMessages((prevMessages) => [
                ...prevMessages,
                [data.user, data.message]
            ]);
        };

        // Listening for 'receive_message' event from the server
        socket.on("receive_message", handleMessage);


        // Cleanup: remove event listener when component unmounts or socket changes
        return () => {
        socket.off("receive_message", handleMessage);
        };

    }, [socket]);


  return (
    <>
        <ScrollView style={tw`flex-1 mb-1 bg-black p-2 min-h-50`} contentContainerStyle={tw`pb-5`}>
            {messages.map((message, ind) => (
                <View
                    key={ind}
                    style={[
                        tw`mb-2 max-w-3/4 p-2 rounded-lg`,
                        message[0].toString().trim() === auth.currentUser.email.toString()
                        ? tw`bg-blue-500 self-end`
                        : tw`bg-gray-600 self-start`
                    ]}
                >  
                    <Text style={tw`text-white text-3 mb-1`}>{message[0].toString()}</Text>
                    <Text style={tw`text-white text-4`}>{message[1]}</Text>
                </View>
            ))}
        </ScrollView>

        <View style={tw`flex-row items-center p-4 bg-white shadow-md`}>
            <TextInput
                style={tw`flex-1 h-10 border border-gray-300 rounded p-2 mr-2`}
                value={inputText}
                onChangeText={handleText}
                placeholder="Type your message..."
            />
            <Pressable onPress={handleSubmit} style={tw`p-2 bg-blue-500 rounded-lg`}>
                <Text style={tw`text-white font-bold`}>Send</Text>
            </Pressable>
        </View>
    </>
  );
}
