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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Champs requis', 'Veuillez saisir votre e-mail/téléphone et mot de passe.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: integrate real auth (e.g. Supabase, Firebase, custom API)
      await new Promise((r) => setTimeout(r, 800));
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Erreur', 'Connexion impossible. Réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Google Sign-In
    Alert.alert('À venir', 'Connexion avec Google sera disponible prochainement.');
  };

  const handleForgotPassword = () => {
    // TODO: navigate to forgot-password when screen exists
    Alert.alert('Mot de passe oublié', 'Fonctionnalité à venir. Contactez le support.');
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
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 48,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VStack space="sm" className="w-full max-w-sm">
            {/* Header: left-aligned */}
            <Text className="pt-2 pb-10 pl-1 font-extrabold text-[32px] text-white text-left leading-tight tracking-tight">
              RedCar Madagascar
            </Text>

            <VStack space="sm" className="w-full">
              {/* Email / Phone */}
              <VStack space="sm" className="w-full">
                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                  Adresse e-mail ou téléphone
                </Text>
                <Input
                  variant="outline"
                  size="xl"
                  className="bg-surface-dark border border-border-subtle rounded-xl"
                >
                  <InputField
                    placeholder="Votre e-mail ou téléphone"
                    placeholderTextColor="rgba(192, 192, 192, 0.7)"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    editable={!isLoading}
                    className="text-white"
                  />
                  <InputIcon
                    as={() => <MaterialIcons name="mail" size={24} color="#FFFFFF" />}
                    size="xl"
                  />
                </Input>
              </VStack>

              {/* Password */}
              <VStack space="sm" className="w-full">
                <Text className="pb-2 font-semibold text-white text-sm uppercase leading-normal tracking-wider">
                  Mot de passe
                </Text>
                <Input
                  variant="outline"
                  size="xl"
                  className="bg-surface-dark border border-border-subtle rounded-xl"
                >
                  <InputField
                    placeholder="Votre mot de passe"
                    placeholderTextColor="rgba(192, 192, 192, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                    className="text-white"
                  />
                  <InputSlot onPress={() => setShowPassword((v) => !v)} className="pr-3">
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={24}
                      color="#FFFFFF"
                    />
                  </InputSlot>
                </Input>
              </VStack>

              <Pressable onPress={handleForgotPassword} className="self-end">
                <Text className="font-medium text-primary text-sm underline">
                  Mot de passe oublié ?
                </Text>
              </Pressable>
            </VStack>

            {/* Se connecter */}
            <VStack space="sm" className="py-4 w-full">
              <Button
                variant="solid"
                action="primary"
                size="xl"
                onPress={handleLogin}
                disabled={isLoading}
                className="bg-primary rounded-xl w-full"
              >
                {isLoading ? (
                  <ButtonSpinner color="#FFFFFF" />
                ) : (
                  <ButtonText className="font-bold uppercase">Se connecter</ButtonText>
                )}
              </Button>
            </VStack>

            {/* OU */}
            <View className="flex flex-row items-center gap-4 py-2">
              <View className="flex-1 bg-metallic/40 h-px" />
              <Text className="font-bold text-white text-sm uppercase tracking-wider">OU</Text>
              <View className="flex-1 bg-metallic/40 h-px" />
            </View>

            {/* Google */}
            <VStack space="sm" className="py-3 w-full">
              <Button
                variant="outline"
                action="default"
                size="xl"
                onPress={handleGoogleLogin}
                disabled={isLoading}
                className="gap-3 bg-surface-dark border-2 border-white rounded-xl w-full"
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

            {/* S'inscrire */}
            <View className="flex justify-center items-center pt-10 pb-4">
              <Text className="font-normal text-white text-base">
                Pas de compte ?{' '}
                <Link href="/register" asChild>
                  <Pressable>
                    <Text className="font-bold text-primary underline underline-offset-2">
                      S&apos;inscrire
                    </Text>
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
