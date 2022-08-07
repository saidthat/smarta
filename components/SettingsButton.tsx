import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { primary } from '../theme';

export default function SettingsButton() {
    const navigator = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigator.navigate('Settings');
            }}
            style={{
                marginTop: -10,
            }}
        >
            <Ionicons name="ios-settings" size={30} color={primary.white} />
        </Pressable>
    );
}
