import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView
            className="flex-1"
            style={{ backgroundColor: isDark ? '#151718' : '#fff' }}
        >
            <View style={styles.container}>
                <Text
                    style={[
                        styles.placeholder,
                        { color: isDark ? '#9BA1A6' : '#687076' }
                    ]}
                >
                    Page de connexion – à venir
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    placeholder: {
        fontSize: 16,
        textAlign: 'center',
    },
});
