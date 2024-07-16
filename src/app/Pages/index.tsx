import React, { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { Camera, CameraType, CameraPictureOptions } from 'expo-camera/legacy';
import tw from 'twrnc';

import PicButton from '@/src/components/Camera/PicButton';

export default function App() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [count, setCount] = useState<number>(0);
  const [cameraView, setCameraView] = useState<boolean>(true);
  const [imagesList, setImagesList] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cameraRef = useRef<Camera | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options: CameraPictureOptions = {
        quality: 0.5,
      };
      const photo = await cameraRef.current?.takePictureAsync(options);
      setImagesList(prev => [...prev, photo?.uri ?? ""]);
      toggleCameraView();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const Increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleCameraView = () => {
    setCameraView(prevView => !prevView);
  };


  const openFullScreenImage = (image: string) => {
    setSelectedImage(image);
  };

  const closeFullScreenImage = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {cameraView ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={Increment}>
              <Text>INCREMENT</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={toggleCameraView}>
              <Text>Exit</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={takePicture}
            >
              <Text>
                  Take
              </Text>
            </Pressable>

            <View>
              <Text style={styles.text}>{count}</Text>

              <Text style={styles.text}>SIZE: {imagesList.length}</Text>
            </View>
          </View>
        </Camera>
      ) : (
        <>
          <Pressable style={tw`bg-white`} onPress={toggleCameraView}>
            <Text>Back To Camera</Text>
            
          </Pressable>

          <View style={tw`bg-white flex-row flex-wrap justify-center`}>
            {imagesList.map((image, index) => (
              <Pressable key={index} onPress={() => openFullScreenImage(image)}>
                <Image source={{ uri: image }} style={tw`w-20 h-20 m-1 rounded-lg`} />
              </Pressable>
            ))}
          </View>

          <Modal visible={selectedImage !== null} transparent={true} onRequestClose={closeFullScreenImage}>
            <Pressable style={styles.modalBackground} onPress={closeFullScreenImage}>
              <Image
                source={{ uri: selectedImage ?? undefined }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </Pressable>
          </Modal>
        </>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});