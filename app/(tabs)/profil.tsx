import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // When auth is implemented: wrap the block below in `if (!isConnected)` and
    // show "Gérez votre profil et vos paramètres" (and full profil content) when connected.

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
                    Profil
                </Text>
                <Text
                    style={[
                        styles.subtitle,
                        { color: isDark ? '#9BA1A6' : '#687076' }
                    ]}
                >
                    Vous n{"'"}êtes pas connecté. Créez un compte ou connectez-vous pour accéder à votre profil.
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#D40000' }]}
                        onPress={() => router.push('/register')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Créer un compte</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#D40000' }]}
                        onPress={() => router.push('/login')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
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
    buttons: {
        marginTop: 20,
        gap: 12,
        alignItems: 'stretch',
        width: '100%',
        maxWidth: 280,
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

