import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { ReleaseProvider } from '../../store/index';

export default function AppLayout() {
  return (
    <ReleaseProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Página inicial',
            tabBarIcon: () => <Entypo name="home" size={32} color={'black'} />,
            tabBarLabelStyle: {
              fontSize: 16,
              padding: 8,
            },
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favoritos',
            tabBarIcon: () => <Entypo name="star" size={32} color={'black'} />,
            tabBarLabelStyle: {
              fontSize: 16,
              padding: 8,
            },
          }}
        />

        <Tabs.Screen
          name="[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </ReleaseProvider>
  );
}

