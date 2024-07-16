import * as ImagePicker from 'expo-image-picker';
import { createContext, useContext, useState, useEffect } from 'react';

import { app, getStorage, ref, uploadBytes, getDownloadURL, listAll } from "@/config/firebase.config";

import { name } from "@/src/assets/profile_data/profile_vals";


const storage = getStorage(app);

const PfpContext = createContext();

export const useProfilePic = () => {
  return useContext(PfpContext);
};

export const PfpProvider = ({ children }) => {
  const [assignedImage, setAssignedImage] = useState(null);


  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `${name}/pfp/${name}-pfp`);
  
    try {
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        
        setAssignedImage(url);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
  };
  

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
  
    if (!result.canceled) {
        await uploadImage(result.assets[0].uri);
    }
  };

  const fetchImage = async () => {
    const imagesRef = ref(storage, `${name}/pfp/`);
    try {
      const result = await listAll(imagesRef);
      if (result.items.length > 0) {
        const firstItem = result.items[0];
        const url = await getDownloadURL(firstItem);
        setAssignedImage(url);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <PfpContext.Provider value={{ assignedImage, selectImage }}>
      {children}
    </PfpContext.Provider>
  );
};
