import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VendreScreen() {
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
                        styles.title,
                        { color: isDark ? '#ECEDEE' : '#11181C' }
                    ]}
                >
                    Vendre
                </Text>
                <Text
                    style={[
                        styles.subtitle,
                        { color: isDark ? '#9BA1A6' : '#687076' }
                    ]}
                >
                    Mettez votre véhicule en vente
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
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
});

