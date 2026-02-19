import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CharacterListScreen } from './src/screens/CharacterListScreen';
import { CharacterPreviewScreen } from './src/screens/CharacterPreviewScreen';
import { ChatListScreen } from './src/screens/ChatListScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CharactersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CharacterList" 
        component={CharacterListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CharacterPreview" 
        component={CharacterPreviewScreen}
        options={{ title: 'Character' }}
      />
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }: any) => ({ title: route.params?.character?.name || 'Chat' })}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen 
        name="Characters" 
        component={CharactersStack}
        options={{ 
          headerShown: false,
          tabBarLabel: 'Characters',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainTabs />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
