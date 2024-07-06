import { Link, Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/src/assets/constants/Colors';
import { useColorScheme, useClientOnlyValue } from '@/src/components/Helpers/serverRenderHelpers';




export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color }) => <FontAwesome name="sign-out" color={color} size={28}/>,
        }}
      />
      
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="profile" color={color} size={28} />,
        }}
      />

      <Tabs.Screen
        name="Graph"
        options={{
          title: 'Graph',
          tabBarIcon: ({ color }) => <FontAwesome name="line-chart" color={color} size={28}/>,
        }}
      />

      <Tabs.Screen
        name="Table"
        options={{
          title: 'Table',
          tabBarIcon: ({ color }) => <FontAwesome name="table" color={color} size={28}/>,
        }}
      />
      
      <Tabs.Screen
        name="Logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => <FontAwesome name="sticky-note" color={color} size={28}/>,
        }}
      />

    </Tabs>
  );
}
