import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GOOGLE_LOGO_URI =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmpu3yKtuPcxC9A_WMYjwUeVMI14WbHBG60WJ7gHkc-4vePeqcd4nt_T6SCRSiqPLDaZtz21Cb__t4cxLe_1L6Oe_j4eDObS8vPyuKyb4X2i7fh6wBCZ0-PqoDcOrmBNWqTnIQnxuIQqkRa-hKmBK2_ITSApi3RNtLe_pI3lN_uiOx_Lwb3h4YuUjQL82NPCYfCX5H59QUCJkGSFnjV0Fit05oNg9N7fmDqu3-udnFlI2Qvv6Jj1EuTWNTL8wjXWGghVO51JK_F4E';

// Reddish-orange for terms link (per design)
const TERMS_LINK_COLOR = '#E85C4A';

export default function RegisterScreen() {
    const [fullName, setFullName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullName.trim()) {
            Alert.alert('Champ requis', 'Veuillez saisir votre nom complet.');
            return;
        }
        if (!emailOrPhone.trim()) {
            Alert.alert('Champ requis', 'Veuillez saisir votre e-mail ou téléphone.');
            return;
        }
        if (!password) {
            Alert.alert('Champ requis', 'Veuillez saisir un mot de passe.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Mot de passe faible', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }
        setIsLoading(true);
        try {
            // TODO: integrate real auth (e.g. Supabase, Firebase, custom API)
            await new Promise((r) => setTimeout(r, 800));
            router.replace('/(tabs)');
        } catch {
            Alert.alert('Erreur', 'Inscription impossible. Réessayez.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // TODO: Google Sign-In
        Alert.alert('À venir', 'Inscription avec Google sera disponible prochainement.');
    };

    const handleTermsPress = () => {
        // TODO: navigate to terms when screen exists
        Alert.alert('Conditions d\'utilisation', 'Cette page sera disponible prochainement.');
    };

    return (
        <SafeAreaView className="flex-1 bg-background-dark" edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingBottom: 40,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <VStack space="sm" className="w-full max-w-sm">
                        {/* Logo */}
                        <View className="items-center pt-8 pb-6">
                            <View className="justify-center items-center mb-4 border-2 border-primary rounded-full w-24 h-24" style={{ backgroundColor: 'rgba(212, 0, 0, 0.15)' }}>
                                <MaterialIcons name="sports-motorsports" size={44} color="#FFFFFF" />
                            </View>
                            <Text className="font-extrabold text-white text-3xl italic uppercase tracking-tight">
                                REDCAR
                            </Text>
                            <Text className="mt-1 font-medium text-white text-xs uppercase tracking-[0.2em]">
                                MADAGASCAR
                            </Text>
                        </View>

                        {/* Title */}
                        <View className="pb-6">
                            <Text className="font-bold text-white text-2xl text-center leading-tight">
                                Créer un compte
                            </Text>
                            <Text className="mt-2 text-white text-sm text-center">
                                Rejoignez l&apos;élite automobile.
                            </Text>
                        </View>

                        {/* Form */}
                        <VStack space="sm" className="px-4 w-full">
                            {/* Nom Complet */}
                            <VStack space="sm" className="w-full">
                                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                                    Nom Complet
                                </Text>
                                <Input variant="outline" size="xl" className="bg-surface-dark border border-border-subtle rounded-xl">
                                    <InputIcon
                                        as={() => <MaterialIcons name="person" size={22} color="#C0C0C0" />}
                                        size="xl"
                                    />
                                    <InputField
                                        placeholder="Votre nom complet"
                                        placeholderTextColor="rgba(192, 192, 192, 0.7)"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        editable={!isLoading}
                                        className="text-white"
                                    />
                                </Input>
                            </VStack>

                            {/* Email ou Téléphone */}
                            <VStack space="sm" className="w-full">
                                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                                    Email ou Téléphone
                                </Text>
                                <Input variant="outline" size="xl" className="bg-surface-dark border border-border-subtle rounded-xl">
                                    <InputIcon
                                        as={() => <MaterialIcons name="mail" size={22} color="#C0C0C0" />}
                                        size="xl"
                                    />
                                    <InputField
                                        placeholder="example@email.com"
                                        placeholderTextColor="rgba(192, 192, 192, 0.7)"
                                        value={emailOrPhone}
                                        onChangeText={setEmailOrPhone}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        editable={!isLoading}
                                        className="text-white"
                                    />
                                </Input>
                            </VStack>

                            {/* Mot de passe */}
                            <VStack space="sm" className="w-full">
                                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                                    Mot de passe
                                </Text>
                                <Input variant="outline" size="xl" className="bg-surface-dark border border-border-subtle rounded-xl">
                                    <InputIcon
                                        as={() => <MaterialIcons name="lock" size={22} color="#C0C0C0" />}
                                        size="xl"
                                    />
                                    <InputField
                                        placeholder="Votre mot de passe"
                                        placeholderTextColor="rgba(192, 192, 192, 0.7)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        editable={!isLoading}
                                        className="text-white"
                                    />
                                    <InputSlot onPress={() => setShowPassword((v) => !v)}>
                                        <MaterialIcons
                                            name={showPassword ? 'visibility' : 'visibility-off'}
                                            size={22}
                                            color="#C0C0C0"
                                        />
                                    </InputSlot>
                                </Input>
                            </VStack>

                            {/* Confirmer le mot de passe */}
                            <VStack space="sm" className="w-full">
                                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                                    Confirmer le mot de passe
                                </Text>
                                <Input variant="outline" size="xl" className="bg-surface-dark border border-border-subtle rounded-xl">
                                    <InputIcon
                                        as={() => <MaterialIcons name="sync" size={22} color="#C0C0C0" />}
                                        size="xl"
                                    />
                                    <InputField
                                        placeholder="Confirmez le mot de passe"
                                        placeholderTextColor="rgba(192, 192, 192, 0.7)"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        editable={!isLoading}
                                        className="text-white"
                                    />
                                    <InputSlot onPress={() => setShowConfirmPassword((v) => !v)}>
                                        <MaterialIcons
                                            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                                            size={22}
                                            color="#C0C0C0"
                                        />
                                    </InputSlot>
                                </Input>
                            </VStack>
                        </VStack>

                        {/* Conditions */}
                        <Text className="px-4 pt-6 text-white text-sm text-center leading-6">
                            En vous inscrivant, vous acceptez nos{' '}
                            <Pressable onPress={handleTermsPress}>
                                <Text className="font-bold underline underline-offset-2" style={{ color: TERMS_LINK_COLOR }}>
                                    Conditions d&apos;utilisation
                                </Text>
                            </Pressable>
                        </Text>

                        {/* S'inscrire */}
                        <VStack space="sm" className="px-4 py-3 w-full">
                            <Button
                                variant="solid"
                                action="primary"
                                size="xl"
                                onPress={handleRegister}
                                disabled={isLoading}
                                className="bg-primary rounded-xl w-full"
                            >
                                {isLoading ? (
                                    <ButtonSpinner color="#FFFFFF" />
                                ) : (
                                    <ButtonText className="font-bold uppercase">S&apos;inscrire</ButtonText>
                                )}
                            </Button>
                        </VStack>

                        {/* ou */}
                        <View className="flex flex-row items-center gap-4 px-4 py-4 w-full">
                            <View className="flex-1 bg-white/20 h-px" />
                            <Text className="font-medium text-white text-sm">ou</Text>
                            <View className="flex-1 bg-white/20 h-px" />
                        </View>

                        {/* Google */}
                        <VStack space="sm" className="px-4 py-3 w-full">
                            <Button
                                variant="outline"
                                action="default"
                                size="xl"
                                onPress={handleGoogleRegister}
                                disabled={isLoading}
                                className="gap-3 bg-surface-dark border border-white rounded-xl w-full"
                            >
                                <ButtonIcon
                                    as={() => (
                                        <Image
                                            source={{ uri: GOOGLE_LOGO_URI }}
                                            style={{ width: 24, height: 24 }}
                                            contentFit="contain"
                                        />
                                    )}
                                />
                                <ButtonText className="text-white">Continuer avec Google</ButtonText>
                            </Button>
                        </VStack>

                        {/* Se connecter */}
                        <View className="flex justify-center items-center px-4 pt-8 pb-4">
                            <Text className="text-white text-base">
                                Déjà un compte ?{' '}
                                <Link href="/login" asChild>
                                    <Pressable>
                                        <Text className="font-bold text-white">Se connecter</Text>
                                    </Pressable>
                                </Link>
                            </Text>
                        </View>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
