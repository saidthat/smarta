import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { primary } from '../theme';

export default function SettingsScreen() {
    const [cardNumber, setCardNumber] = useState('');
    const navigator = useNavigation();

    return (
        <KeyboardAwareScrollView
            extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    marginTop: 20,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Helvetica Neue Bold',
                            fontSize: 16,
                        }}
                    >
                        BreezeCard Number:
                    </Text>
                    <TextInput
                        placeholder="card number"
                        keyboardType="numeric"
                        style={{
                            flexGrow: 1,
                            marginLeft: 20,
                            fontSize: 16,
                            backgroundColor: primary.text.secondary,
                            borderRadius: 4,
                            color: primary.text.primary,
                            padding: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 25,
                            fontFamily: 'Helvetica Neue Medium',
                        }}
                        onChangeText={(value) => {
                            setCardNumber(value);
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        width: 'auto',
                        flexDirection: 'row',
                        padding: 15,
                        margin: 20,
                        marginTop: 'auto',
                        marginBottom: 50,
                        borderRadius: 10,
                        backgroundColor: primary.orange,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={async () => {
                        await AsyncStorage.setItem(
                            'breezeCardNumber',
                            cardNumber
                        );
                        navigator.goBack();
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Helvetica Neue Bold',
                            fontSize: 20,
                            color: primary.white,
                        }}
                    >
                        Save!
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}
