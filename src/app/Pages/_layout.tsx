import tw from 'twrnc';

import { useMemo, memo } from 'react';
import { Image, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme, useClientOnlyValue } from '@/src/helpers/serverRenderHelpers';
import { PfpProvider, useProfilePic } from '@/src/context/pfpContext';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/assets/constants/Colors';

import { defaultAvatar } from "@/src/assets/constants/Fixed_Vars.js";
import { FontProvider } from '@/src/context/fontContext';
import { TimerProvider } from '@/src/context/timerContext';


// Separate component for fetching and displaying the profile image
const ProfileImage = memo(() => {
  const { assignedImage } = useProfilePic();

  return (
    <View style={tw`bg-blue-400 border border-black rounded-full py-0.25 px-0.3 mt-1`}>
      <Image 
        source={{ uri: assignedImage || defaultAvatar }} 
        style={tw`w-7.5 h-7.5 border border-black rounded-full`} 
      />
    </View>
  );
});


export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Memoize the tab options
  const tabOptions = useMemo(() => ({
    index: {
      title: 'index',
      tabBarIcon: ({ color }: { color: string }) => <FontAwesome name="sign-out" color={color} size={28}/>,
    },
    Profile: {
      title: 'Profile',
      tabBarIcon: () => <ProfileImage />,
    },
    Graph: {
      title: 'Graph',
      tabBarIcon: ({ color }: { color: string }) => <FontAwesome name="line-chart" color={color} size={28}/>,
    },
    Table: {
      title: 'Table',
      tabBarIcon: ({ color }: { color: string }) => <FontAwesome name="table" color={color} size={28}/>,
    },
    Logs: {
      title: 'Logs',
      tabBarIcon: ({ color }: { color: string }) => <FontAwesome name="sticky-note" color={color} size={28}/>,
    },
  }), []);

  return (
    <PfpProvider>
      <FontProvider>
        <TimerProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: useClientOnlyValue(false, true),
            }}>
            {Object.entries(tabOptions).map(([name, options]) => (
              <Tabs.Screen key={name} name={name} options={options} />
            ))}
          </Tabs>
        </TimerProvider>
      </FontProvider>
    </PfpProvider>
  );
}