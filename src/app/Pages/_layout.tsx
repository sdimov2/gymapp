import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/src/assets/constants/Colors';
import { useColorScheme, useClientOnlyValue } from '@/src/components/Helpers/serverRenderHelpers';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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

      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Table',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      /> */}

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-out" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Graph"
        options={{
          title: 'Graph',
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Table"
        options={{
          title: 'Table',
          tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="Logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => <TabBarIcon name="sticky-note" color={color} />,
        }}
      />

    </Tabs>
  );
}
