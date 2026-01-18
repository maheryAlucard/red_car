import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

// Mock search data
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

const filterButtons = [
    { id: 'category', label: 'Catégorie: Location', active: true },
    { id: 'brand', label: 'Marque', active: false },
    { id: 'price', label: 'Prix', active: false },
    { id: 'distance', label: 'Distance', active: false },
    { id: 'transmission', label: 'Boîte', active: false },
    { id: 'fuel', label: 'Carburant', active: false },
];

const RechercheScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [results] = useState(mockSearchResults);

    const renderCarCard = ({ item }: { item: SearchCar }) => (
        <TouchableOpacity
            onPress={() => router.push({ pathname: '/car-detail', params: { carId: item.id } })}
        >
            <View className="bg-gray-800 mb-4 rounded-xl w-full overflow-hidden">
                <View className="flex flex-col">
                    <View className="w-full" style={{ aspectRatio: 16 / 9 }}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            className="w-full h-full"
                            contentFit="cover"
                        />
                    </View>
                    <View className="flex flex-col justify-center items-stretch gap-2 p-4 w-full">
                        <Text className="font-bold text-white text-lg leading-tight tracking-tight">
                            {item.name}
                        </Text>
                        <View className="flex flex-row items-center gap-4">
                            <View className="flex flex-row items-center gap-1.5">
                                <MaterialIcons name="calendar-today" size={18} color="#B0B0B0" />
                                <Text className="text-gray-400 text-sm">{item.year}</Text>
                            </View>
                            <View className="flex flex-row items-center gap-1.5">
                                <MaterialIcons name="settings" size={18} color="#B0B0B0" />
                                <Text className="text-gray-400 text-sm">{item.transmission}</Text>
                            </View>
                            <View className="flex flex-row items-center gap-1.5">
                                {item.fuel === 'Électrique' ? (
                                    <MaterialIcons name="bolt" size={18} color="#B0B0B0" />
                                ) : (
                                    <MaterialIcons name="local-gas-station" size={18} color="#B0B0B0" />
                                )}
                                <Text className="text-gray-400 text-sm">{item.fuel}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between items-end mt-2">
                            <View className="flex flex-row items-center gap-2">
                                <MaterialIcons name="location-on" size={18} color="#B0B0B0" />
                                <Text className="font-normal text-gray-400 text-base leading-normal">
                                    {item.location}
                                </Text>
                            </View>
                            <View className="flex flex-row items-baseline">
                                <Text className="font-bold text-primary text-xl leading-normal">
                                    {item.price} Ar{' '}
                                </Text>
                                <Text className="font-normal text-gray-400 text-base">{item.priceUnit}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderListView = () => (
        <>
            {/* Filters */}
            <View className="mt-8 px-4 pb-2">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 24 }}
                >
                    <HStack className="gap-2">
                        {filterButtons.map((filter) => (
                            <TouchableOpacity
                                key={filter.id}
                                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${filter.active ? 'bg-primary' : 'bg-gray-800'
                                    }`}
                            >
                                <HStack space='sm'>
                                    <Text
                                        className={`text-sm font-medium leading-normal ${filter.active ? 'text-white' : 'text-white'
                                            }`}
                                    >
                                        {filter.label}
                                    </Text>
                                    <MaterialIcons
                                        name="expand-more"
                                        size={20}
                                        color={filter.active ? '#FFFFFF' : '#F5F5F5'}
                                    />
                                </HStack>
                            </TouchableOpacity>
                        ))}
                    </HStack>
                </ScrollView>
            </View>

            {/* Results Count & Sort */}
            <View className="flex flex-row justify-between items-center px-4 pt-2 pb-3">
                <Text className="font-normal text-gray-400 text-base leading-normal">
                    {results.length} véhicules trouvés
                </Text>
                <Pressable className="flex flex-row items-center gap-1.5">
                    <MaterialIcons name="swap-vert" size={20} color={isDark ? '#F5F5F5' : '#0A0A0A'} />
                    <Text className="font-medium text-white text-sm">Trier par</Text>
                </Pressable>
            </View>

            {/* Car List */}
            <FlatList
                data={results}
                renderItem={renderCarCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex flex-col justify-center items-center py-20">
                        <MaterialIcons name="search-off" size={72} color="#B0B0B0" style={{ opacity: 0.5 }} />
                        <Text className="mt-4 font-bold text-white text-lg">Aucun résultat</Text>
                        <Text className="mt-1 max-w-xs text-gray-400 text-base text-center">
                            Aucun véhicule ne correspond à votre recherche. Essayez d&apos;ajuster vos filtres.
                        </Text>
                    </View>
                }
            />
        </>
    );

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <VStack className="flex-1">
                {/* Top App Bar */}
                <View className="flex flex-row justify-between items-center bg-background-light dark:bg-background-dark/80 px-screenX w-full">
                    <Pressable
                        className="flex justify-center items-center w-12 h-12 shrink-0"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={24}
                            color={isDark ? '#F5F5F5' : '#0A0A0A'}
                        />
                    </Pressable>
                    <Text className="flex-1 font-bold text-white text-lg text-center leading-tight tracking-tight">
                        Rechercher
                    </Text>
                    <View className="flex flex-row items-center gap-2">
                        <Pressable
                            className="flex justify-center items-center w-12 h-12"
                            onPress={() => router.push('/map-view')}
                        >
                            <MaterialIcons
                                name="map"
                                size={24}
                                color={isDark ? '#F5F5F5' : '#0A0A0A'}
                            />
                        </Pressable>
                        <Pressable className="flex justify-center items-center w-12 h-12">
                            <MaterialIcons
                                name="tune"
                                size={24}
                                color={isDark ? '#F5F5F5' : '#0A0A0A'}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Main Content */}
                <View className="flex-1" style={{ marginTop: 0 }}>
                    {renderListView()}
                </View>
            </VStack>
        </SafeAreaView>
    );
}

export default RechercheScreen;