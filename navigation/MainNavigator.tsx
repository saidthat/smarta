import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';

import { primary } from '../theme';
import SettingsButton from '../components/SettingsButton';
import BackButton from '../components/BackButton';

export default function MainNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Helvetica Neue Bold',
                    fontSize: 30,
                    color: primary.white,
                },
            }}
        >
            <Stack.Screen
                name="Home"
                options={{
                    title: 'Smarta',
                    headerStyle: {
                        backgroundColor: primary.orange,
                    },
                    headerRight: SettingsButton,
                }}
                component={HomeScreen}
            />
            <Stack.Screen
                name="Settings"
                options={{
                    title: 'Settings',
                    headerStyle: {
                        backgroundColor: primary.blue,
                    },
                    headerLeft: BackButton,
                }}
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
}
