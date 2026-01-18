import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { Suspense, lazy, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Set to false when ready to show the real map (requires dev build, not Expo Go)
const MAP_HIDDEN_WHILE_CODING = true;

// expo-maps has native code NOT included in Expo Go — only load it in dev/production builds (iOS/Android)
const MapViewNative = lazy(() => import('./map-view-native'));

interface SearchCar {
    id: string;
    name: string;
    year: number;
    transmission: 'Manuelle' | 'Automatique';
    fuel: 'Essence' | 'Diesel' | 'Électrique';
    location: string;
    price: string;
    priceUnit: string;
    imageUrl: string;
    latitude?: number;
    longitude?: number;
}

// Mock search data - in a real app, this would come from props or a shared state
const mockSearchResults: SearchCar[] = [
    {
        id: '1',
        name: 'Lamborghini Aventador',
        year: 2021,
        transmission: 'Manuelle',
        fuel: 'Diesel',
        location: 'Antananarivo',
        price: '250,000',
        priceUnit: '/jour',
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuByhR5DkHsmGc7i_XIi5Y3RIkcxf8rO0IJzkSSR98X2jIk_5tlYK3ZptFtptZONTt5AGm5qv8BV2KXlJIHFCCjrp6RGilLz-4Y7IuXDJ3ybOTe6paAFENe805Aco7AdZULHfoiKjqQUsNlunWE0RBW21wiKnX-R42g9Sbhcunq88_5utodMtH0QeA4wNF1L01339vkWBGdtHp5knRgSPfcHauCnR3GSTtuRgC6vZr3NkV66wAuevmyZNdjjoC9VlHuzxpDU9NaAXSQ',
        latitude: -18.8792,
        longitude: 47.5079,
    },
    {
        id: '2',
        name: 'Renault Kwid',
        year: 2022,
        transmission: 'Automatique',
        fuel: 'Essence',
        location: 'Toamasina',
        price: '85,000',
        priceUnit: '/jour',
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAwtve0ZaHBkAEPdl76YOjYab1ioNuCRR2rK6kaNd0nln7frvTeW8a-DQtl7f0Jl5rQHWnuSWttlht5zlRqvwt4eOktC5-S7N_tzzRwnhQMconnheDciOpzWnutDHxNV5J6XLoDcG69fV1ZrMIJGHaMhRxwYJaDpXW891f2VGBhtqjPKnBIgAyVNCpDDM8H7mzjjghbVAWFiTWdqDCCCJ-F5Guev3Ht06mGKSXjOkIs0mifY1d7ARMSyaemuexJWX7EvyC4aVT-Zss',
        latitude: -18.1496,
        longitude: 49.4023,
    },
    {
        id: '3',
        name: 'Porsche Taycan',
        year: 2023,
        transmission: 'Automatique',
        fuel: 'Électrique',
        location: 'Fianarantsoa',
        price: '450,000',
        priceUnit: '/jour',
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAGEhYVgutY0wp3M6UOKWS1xeqs40B6ZtlOEdxM6gn7-0tRhwVaP9ba46aCFcNtw3w78bC0P3TqFejGNlQYzlrb9juQf49I2fUK5KEKV0A7fXVdrT5TAGYHfQX_deJeUXovdKiE-u1H5D4DC5wVM_-vLrTA3oIhMa5IuJoub8w1htTSliy69u3V-RSj4bmFANhZCbLCVSGSouwpPJWplPcVhnU8r6VSkhs-2B4hkrzDA_q1F6JP8XeZV-gW_rn-K6Z8JyW4dvFuKMI',
        latitude: -21.4536,
        longitude: 47.0858,
    },
    {
        id: '4',
        name: 'Toyota Hilux',
        year: 2022,
        transmission: 'Automatique',
        fuel: 'Diesel',
        location: 'Antananarivo',
        price: '150,000',
        priceUnit: '/jour',
        imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCfYOszgBLcxBOsuCEMnvnRZValG12cnFMckgmKmP1TqZPe_nAxCwW-zGwKinfHKEuindcTgG_-O0vhM4FZNcu5MJW3HrV0kMewOuX7KP1GDkL-Mt8HvkRd2ELNC7ZXwrDKKXSGBb0iE2hSOGEpWdRYLfBgUYWCZ_txYKocBpVKvysORBQbOSv3guPxQMPrzi_-xWC-IBO5-FGmDwg7CWl9Y2WHwtk2FyhAIfye6gbmKD_dBNq_eTDR_IQ5XagU3pHYZ2SVJJhE7jc',
        latitude: -18.8792,
        longitude: 47.5079,
    },
];

const MapViewScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const params = useLocalSearchParams<{ query?: string }>();
    const [selectedCar, setSelectedCar] = useState<SearchCar | null>(mockSearchResults[0] || null);

    const renderMapView = () => {
        // Check if running in Expo Go (maps don't work in Expo Go) or map is temporarily hidden
        const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

        if (MAP_HIDDEN_WHILE_CODING || isExpoGo) {
            return (
                <View className="relative flex-1">
                    {/* Map Placeholder for Expo Go */}
                    <View className="flex-1 justify-center items-center bg-gray-900">
                        <MaterialIcons name="map" size={64} color="#666" />
                        <Text className="mt-4 px-screenX text-gray-400 text-base text-center">
                            Les cartes ne sont pas disponibles dans Expo Go
                        </Text>
                        <Text className="mt-2 px-screenX text-gray-500 text-sm text-center">
                            Utilisez un build de développement pour voir la carte
                        </Text>
                    </View>

                    {/* Selected Car Card */}
                    {selectedCar && (
                        <View className="right-0 bottom-0 left-0 z-10 absolute flex flex-col items-center gap-4 px-screenX py-4">
                            <View className="bg-[#222222]/90 shadow-2xl p-4 rounded-xl w-full max-w-md">
                                <View className="flex justify-between items-stretch gap-4">
                                    <View className="flex flex-col flex-[2_2_0px] justify-between gap-3">
                                        <View className="flex flex-col gap-1">
                                            <Text className="font-normal text-white/60 text-sm leading-normal">
                                                {selectedCar.transmission}
                                            </Text>
                                            <Text className="font-bold text-white text-lg leading-tight">
                                                {selectedCar.name}
                                            </Text>
                                            <Text className="font-normal text-white/60 text-sm leading-normal">
                                                À partir de {selectedCar.price} Ar {selectedCar.priceUnit}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            className="flex justify-center items-center bg-primary px-4 rounded-lg w-full h-10 overflow-hidden cursor-pointer"
                                            onPress={() => router.push({ pathname: '/car-detail', params: { carId: selectedCar.id } })}
                                        >
                                            <Text className="font-bold text-white text-sm truncate leading-normal">
                                                Voir les détails
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        className="flex-1 bg-cover bg-no-repeat bg-center rounded-lg w-full"
                                        style={{ aspectRatio: 4 / 3 }}
                                    >
                                        <Image
                                            source={{ uri: selectedCar.imageUrl }}
                                            className="rounded-lg w-full h-full"
                                            contentFit="cover"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            );
        }

        // Only load expo-maps (MapViewNative) on iOS/Android with a dev or production build — never in Expo Go or on web
        const canUseNativeMaps =
            (Platform.OS === 'ios' || Platform.OS === 'android');

        if (!canUseNativeMaps) {
            return (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-white">Maps are only available on Android and iOS</Text>
                </View>
            );
        }

        return (
            <Suspense
                fallback={
                    <View className="flex-1 justify-center items-center bg-gray-900">
                        <Text className="text-gray-400">Chargement de la carte…</Text>
                    </View>
                }
            >
                <MapViewNative selectedCar={selectedCar} />
            </Suspense>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <VStack className="flex-1">
                {/* Top App Bar */}
                <View
                    className="top-0 z-20 absolute flex flex-row justify-between items-center px-screenX pt-4 pb-12 w-full"
                    style={{
                        backgroundColor: 'rgba(18, 18, 18, 0.8)',
                    }}
                >
                    <TouchableOpacity
                        className="flex justify-center items-center w-12 h-12 shrink-0"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="flex-1 font-bold text-white text-lg text-center leading-tight tracking-tight">
                        Carte
                    </Text>
                    <TouchableOpacity className="flex justify-center items-center w-12 h-12">
                        <MaterialIcons name="tune" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View className="flex-1">{renderMapView()}</View>
            </VStack>
        </SafeAreaView>
    );
};

export default MapViewScreen;

