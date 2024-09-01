import { useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/src/helpers/Built_In/serverRenderHelpers';
import { useFonts, Raleway_200ExtraLight, Raleway_400Regular, Raleway_500Medium_Italic } from '@expo-google-fonts/raleway';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Loaded Fonts
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Raleway_200ExtraLight,
    Raleway_400Regular,
    Raleway_500Medium_Italic,
    "AustraliaHand": require('@/src/assets/fonts/AustraliaHand.ttf'),
    "Dosis": require('@/src/assets/fonts/Dosis-VariableFont_wght.ttf'),
    "Arsenal-Bold": require('@/src/assets/fonts/ArsenalSC-Bold.ttf'),
    "Arsenal-BoldItalic": require('@/src/assets/fonts/ArsenalSC-BoldItalic.ttf'),
    "Arsenal-Italic": require('@/src/assets/fonts/ArsenalSC-Italic.ttf'),
    "Arsenal": require('@/src/assets/fonts/ArsenalSC-Regular.ttf'),
  });


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;  
    if (loaded) SplashScreen.hideAsync();
  }, [error, loaded]);

  if (!loaded) return null;


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Tabs" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}



// ERROR CHECKS

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: 'Tabs' };