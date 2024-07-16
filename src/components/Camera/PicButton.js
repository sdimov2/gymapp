import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PicButton = () => {
    const other = () => {
        // Handle onPress event here
    };

    

    return (
        <Pressable
            style={styles.button}
            onPress={other}
        >
            <Text>
                Take
            </Text>
        </Pressable>
    );
};

export default PicButton;


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
  });