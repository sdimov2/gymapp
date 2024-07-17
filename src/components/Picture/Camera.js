import React, { useRef, useState } from 'react';
import { View, Pressable, Text, Modal, SafeAreaView, ScrollView, Image } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import tw from 'twrnc';

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


// PermissionRequest Component
const PermissionRequest = ({ requestPermission }) => (
  <SafeAreaView style={tw`flex-1 bg-gray-100 justify-center items-center`}>
    <Text style={tw`text-lg text-center mb-4`}>We need your permission to use the camera</Text>
    <Pressable 
      onPress={requestPermission} 
      style={tw`bg-blue-500`}
    >
      Grant permission
    </Pressable>
  </SafeAreaView>
);

// CameraView Component
const CameraView = ({ type, cameraRef, onTakePicture, onToggleCameraType, onExit }) => (
  <View style={tw`flex-1`}>
    <Camera style={tw`flex-1`} type={type} ref={cameraRef}>

    </Camera>

    {/* Bottom Buttons */}
    <View style={tw`justify-end pb-8 flex-row mb-6 mt-4 justify-center`}>

        <View style={tw`absolute left-8 mt-2`}>
            <Pressable 
              onPress={onExit} 
              style={[tw`bg-gray-800 p-3 rounded-full items-center justify-center w-12 h-12`]}
            >
                <AntDesign name="left" size={24} color="white" />
            </Pressable>
        </View>
        
        {/* Capture Button */}
        <View style={tw`absolute`}>
          <Pressable 
            onPress={onTakePicture}
            style={tw`bg-white w-16 h-16 rounded-full border-4 border-gray-300`}
          >
            <View style={tw`bg-white w-14 h-14 rounded-full`} />
          </Pressable>
        </View>

        {/* Flip Camera Button */}
        <View style={tw`absolute right-8 mt-2`}>
          <Pressable 
            onPress={onToggleCameraType}
            style={tw`bg-gray-800 p-3 rounded-full items-center justify-center w-15 h-12`}
          >
            <FontAwesome6 name="camera-rotate" size={24} color="white" />
          </Pressable>
        </View>
      </View>

    
  </View>
);

// ImageReview Component
const ImageReview = ({ imageUri, onConfirm, onRetake }) => (
  <View style={tw`items-center top-1/14`}>
  <View style={tw`w-full h-13/14 bg-green-600 rounded-lg p-1`}>
    <ScrollView contentContainerStyle={tw`flex-grow `}>
      <View style={tw`flex-1 items-center mb-1`}>
        <Image source={{ uri: imageUri }} style={tw`w-96 h-170`} />
      </View>

      <View style={tw`flex-row justify-between my-0.5`}>
        <Pressable
          style={tw`border border-black bg-green-500 p-2 rounded-lg w-10/21`}
          onPress={onConfirm}
        >
          <Text style={tw`text-white text-center`}>Confirm</Text>
        </Pressable>
        <Pressable
          style={tw`border border-black bg-red-500 p-2 rounded-lg w-10/21`}
          onPress={onRetake}
        >
          <Text style={tw`text-white text-center`}>Close</Text>
        </Pressable>
      </View>
    </ScrollView>
  </View>
</View>
);

// Main CameraComponent
const CameraComponent = ({ onCapture, toggleCameraView }) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <PermissionRequest requestPermission={requestPermission} />;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setPhotoTaken(true);
    }
  };

  const toggleCameraType = () => {
    setType(current => 
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <Modal transparent={true} animationType="slide">
      <SafeAreaView style={tw`flex-1 bg-black`}>
        {photoTaken ? (
          <ImageReview 
            imageUri={imageUri} 
            onConfirm={() => onCapture(imageUri)} 
            onRetake={() => setPhotoTaken(false)} 
          />
        ) : (
          <CameraView 
            type={type}
            cameraRef={cameraRef}
            onTakePicture={takePicture}
            onToggleCameraType={toggleCameraType}
            onExit={toggleCameraView}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default CameraComponent;
