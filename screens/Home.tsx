import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { primary } from '../theme';

export default function HomeScreen() {
    const [loaded, setLoaded] = useState(false);
    const [cardNumber, setCardNumber] = useState<string | undefined>(undefined);
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadData = async () => {
            const item = await AsyncStorage.getItem('breezeCardNumber');
            if (item !== '' || item !== undefined) {
                setCardNumber(item);
            }
            setLoaded(true);
        };
        loadData();
    }, [isFocused]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {!loaded ? (
                <>
                    <ActivityIndicator
                        size="large"
                        color={primary.text.secondary}
                    />

                    <Text
                        style={{
                            fontSize: 25,
                            marginTop: 10,
                            fontFamily: 'Helvetica Neue Bold',
                            color: primary.text.primary,
                        }}
                    >
                        Loading...
                    </Text>
                </>
            ) : (
                <>
                    <Text>Home Screen2</Text>
                    {cardNumber !== undefined && <Text>{cardNumber}</Text>}
                </>
            )}
        </View>
    );
}
