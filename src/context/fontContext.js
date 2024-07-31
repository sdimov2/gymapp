import {createContext} from 'react';
import { useFonts, Raleway_200ExtraLight, Raleway_400Regular, Raleway_500Medium_Italic } from '@expo-google-fonts/raleway';

const FontContext = createContext();

export function FontProvider({children}) {
    useFonts({
        Raleway_200ExtraLight,
        Raleway_400Regular,
        Raleway_500Medium_Italic,
        "AustraliaHand": require('@/src/assets/fonts/AustraliaHand.ttf'),
        "Dosis": require('@/src/assets/fonts/Dosis-VariableFont_wght.ttf'),
        "Arsenal-Bold": require('@/src/assets/fonts/ArsenalSC-Bold.ttf'),
        "Arsenal-BoldItalic": require('@/src/assets/fonts/ArsenalSC-BoldItalic.ttf'),
        "Arsenal-Italic": require('@/src/assets/fonts/ArsenalSC-Italic.ttf'),
        "Arsenal": require('@/src/assets/fonts/ArsenalSC-Regular.ttf')
    });

    return (
        <FontContext.Provider value={{}}>
            {children}
        </FontContext.Provider>
    );
}