/* eslint-disable react/style-prop-object */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';

preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        /**
         * Prepare and load anything that needs to be loaded before the app is ready.
         */
        async function prepare() {
            await Font.loadAsync({
                'Helvetica Neue': require('./assets/fonts/HelveticaNeue/HelveticaNeue.ttf'),
                'Helvetica Neue Bold': require('./assets/fonts/HelveticaNeue/HelveticaNeueBd.ttf'),
                'Helvetica Neue Medium': require('./assets/fonts/HelveticaNeue/HelveticaNeueMed.ttf'),
            });

            setAppIsReady(true);
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await hideAsync();
            console.log('Splash screen hidden');
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </View>
    );
}
