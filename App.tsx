import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CharacterListScreen } from './src/screens/CharacterListScreen';
import { CharacterPreviewScreen } from './src/screens/CharacterPreviewScreen';
import { ChatListScreen } from './src/screens/ChatListScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { STRINGS } from './src/constants/strings';

import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CharactersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: '#F3F4F6' },
      }}
    >
      <Stack.Screen 
        name="CharacterList" 
        component={CharacterListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CharacterPreview" 
        component={CharacterPreviewScreen}
        options={{ title: STRINGS.characters }}
      />
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen}
        options={{ title: STRINGS.chats }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }: any) => ({ 
          title: route.params?.character?.name || STRINGS.chats,
        })}
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
          tabBarLabel: STRINGS.characters,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: STRINGS.settings,
          tabBarLabel: STRINGS.settings,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainTabs />
          <StatusBar style="auto" />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
