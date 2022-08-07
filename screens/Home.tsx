import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { primary } from '../theme';
import { fetchBreezeCardData } from '../libraries/BreezeCard';

export default function HomeScreen() {
    /**
     * Has all the initial loading completed?
     */
    const [loaded, setLoaded] = useState(false);

    /**
     * The BreezeCard balance, product name, or error.
     */
    const [balance, setBalance] = useState<string | undefined | null>(
        undefined
    );

    /**
     * Are we currently fetching breeze card data?
     */
    const [loadingBreezeBalance, setLoadingBreezeBalance] = useState(false);

    /**
     * Is this page in focus
     */
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadData = async () => {
            const cardNumber = await AsyncStorage.getItem('breezeCardNumber');
            setBalance('Loading...');

            if (cardNumber !== '' && cardNumber !== undefined) {
                setLoadingBreezeBalance(true);
                const parsedBalance = await fetchBreezeCardData(cardNumber);
                setBalance(parsedBalance);
                setLoadingBreezeBalance(false);
            }
            setLoaded(true);
        };
        loadData();
    }, [isFocused]);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
            }}
        >
            {!loaded ? (
                <View
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                    }}
                >
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
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    {balance !== undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Helvetica Neue Bold',
                                    color: primary.text.primary,
                                    marginRight: 10,
                                    marginLeft: 15,
                                }}
                            >
                                Balance:
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Helvetica Neue Bold',
                                    color: primary.yellow,
                                }}
                            >
                                {balance === null ? 'Unable to fetch' : balance}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: 15,
                                }}
                                onPress={async () => {
                                    if (!loadingBreezeBalance) {
                                        setLoadingBreezeBalance(true);
                                        setBalance('Loading...');
                                        const breezeCardNumber =
                                            await AsyncStorage.getItem(
                                                'breezeCardNumber'
                                            );
                                        if (
                                            breezeCardNumber !== '' &&
                                            breezeCardNumber !== undefined
                                        ) {
                                            setBalance(
                                                await fetchBreezeCardData(
                                                    breezeCardNumber
                                                )
                                            );
                                        }
                                        setLoadingBreezeBalance(false);
                                    }
                                }}
                            >
                                <Ionicons
                                    name="refresh-circle-outline"
                                    size={24}
                                    color={
                                        loadingBreezeBalance === true
                                            ? primary.text.secondary
                                            : primary.blue
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Welcome 👋</Text>
                    </View>
                </View>
            )}
        </View>
    );
}
