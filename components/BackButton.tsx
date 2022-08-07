import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { primary } from '../theme';

export default function BackButton() {
    const navigator = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigator.goBack();
            }}
            style={{
                marginTop: -10,
            }}
        >
            <Ionicons name="arrow-back-sharp" size={30} color={primary.white} />
        </Pressable>
    );
}
