import { CarImageCarousel } from '@/components/car-image-carousel';
import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface CarDetail {
    id: string;
    name: string;
    year: number;
    transmission: 'Manuelle' | 'Automatique';
    fuel: 'Essence' | 'Diesel' | 'Électrique';
    location: string;
    mileage: string;
    rentalPrice: string;
    salePrice: string;
    imageUrl: string;
    description: string;
    images?: string[];
}

// Mock car data - in a real app, this would come from an API or route params
const mockCarData: CarDetail = {
    id: '1',
    name: 'Ford Mustang GT',
    year: 2023,
    transmission: 'Automatique',
    fuel: 'Essence',
    location: 'Antananarivo',
    mileage: '45,000 km',
    rentalPrice: '250 000',
    salePrice: '150 000 000',
    imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDwO5G1gCA7yYZZqiUsS1iHNZCgRKxLlhuDbM4l6z-BwujjB57niW7lT3NCCvb8v78fkcHrSWR7iEWilkA9GR_O0HsVQ_5SMVVi-l5wF0J7ATfgEALhtsudsa6da3mmsTuZeGDr1tDIuKwbm-ywLzoZhdTWRgmQHDOOTxLTTHjp3v_aOUqO-xu3SJGCBhKikCFg_e2VAT9Z-X7v67PD5GN8omQKwSqLAfNlataVKMfCPVmGrOfn7MO2Iw6sR2CRTiF3dpfQG81BE',
    description:
        'Découvrez la puissance brute et le style emblématique de la Ford Mustang GT. Avec son moteur V8 performant et son design agressif, cette icône américaine offre une expérience de conduite inoubliable. Parfaitement entretenue, elle est prête à prendre la route pour une location exaltante ou un achat passionné.',
    images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDwO5G1gCA7yYZZqiUsS1iHNZCgRKxLlhuDbM4l6z-BwujjB57niW7lT3NCCvb8v78fkcHrSWR7iEWilkA9GR_O0HsVQ_5SMVVi-l5wF0J7ATfgEALhtsudsa6da3mmsTuZeGDr1tDIuKwbm-ywLzoZhdTWRgmQHDOOTxLTTHjp3v_aOUqO-xu3SJGCBhKikCFg_e2VAT9Z-X7v67PD5GN8omQKwSqLAfNlataVKMfCPVmGrOfn7MO2Iw6sR2CRTiF3dpfQG81BE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDwO5G1gCA7yYZZqiUsS1iHNZCgRKxLlhuDbM4l6z-BwujjB57niW7lT3NCCvb8v78fkcHrSWR7iEWilkA9GR_O0HsVQ_5SMVVi-l5wF0J7ATfgEALhtsudsa6da3mmsTuZeGDr1tDIuKwbm-ywLzoZhdTWRgmQHDOOTxLTTHjp3v_aOUqO-xu3SJGCBhKikCFg_e2VAT9Z-X7v67PD5GN8omQKwSqLAfNlataVKMfCPVmGrOfn7MO2Iw6sR2CRTiF3dpfQG81BE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDwO5G1gCA7yYZZqiUsS1iHNZCgRKxLlhuDbM4l6z-BwujjB57niW7lT3NCCvb8v78fkcHrSWR7iEWilkA9GR_O0HsVQ_5SMVVi-l5wF0J7ATfgEALhtsudsa6da3mmsTuZeGDr1tDIuKwbm-ywLzoZhdTWRgmQHDOOTxLTTHjp3v_aOUqO-xu3SJGCBhKikCFg_e2VAT9Z-X7v67PD5GN8omQKwSqLAfNlataVKMfCPVmGrOfn7MO2Iw6sR2CRTiF3dpfQG81BE',
    ],
};

type TabType = 'Description' | 'Spécifications' | 'Avis';

const CarDetailScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const params = useLocalSearchParams<{ carId?: string }>();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<TabType>('Description');

    // Animation values
    const screenWidth = Dimensions.get('window').width;
    const tabWidth = screenWidth / 3;
    const indicatorPosition = useSharedValue(0);
    const contentOpacity = useSharedValue(1);
    const contentTranslateY = useSharedValue(0);

    // Tab scale animations
    const descScale = useSharedValue(1);
    const specScale = useSharedValue(1);
    const avisScale = useSharedValue(1);

    // In a real app, fetch car data based on params.carId
    const car = mockCarData;
    const images = car.images || [car.imageUrl];

    const handleShare = () => {
        // Implement share functionality
        console.log('Share car:', car.id);
    };

    const handleBuy = () => {
        // Implement buy functionality
        console.log('Buy car:', car.id);
    };

    const handleRent = () => {
        // Navigate to rent page with car data
        router.push({
            pathname: '/rent',
            params: {
                carId: car.id,
                rentalPrice: car.rentalPrice,
            },
        });
    };

    const handleMakeOffer = () => {
        // Implement make offer functionality
        console.log('Make offer for car:', car.id);
    };

    // Update indicator position when tab changes
    useEffect(() => {
        const tabIndex = activeTab === 'Description' ? 0 : activeTab === 'Spécifications' ? 1 : 2;
        indicatorPosition.value = withSpring(tabIndex * tabWidth, {
            damping: 15,
            stiffness: 200,
        });

        // Animate tab scales
        descScale.value = withSpring(activeTab === 'Description' ? 1.05 : 1, {
            damping: 15,
            stiffness: 150,
        });
        specScale.value = withSpring(activeTab === 'Spécifications' ? 1.05 : 1, {
            damping: 15,
            stiffness: 150,
        });
        avisScale.value = withSpring(activeTab === 'Avis' ? 1.05 : 1, {
            damping: 15,
            stiffness: 150,
        });

        // Animate content transition
        contentOpacity.value = withTiming(0, { duration: 150 }, () => {
            contentOpacity.value = withTiming(1, { duration: 200 });
        });
        contentTranslateY.value = withTiming(10, { duration: 150 }, () => {
            contentTranslateY.value = withTiming(0, { duration: 200 });
        });
    }, [activeTab]);

    const getFuelIcon = () => {
        switch (car.fuel) {
            case 'Électrique':
                return 'bolt';
            case 'Diesel':
                return 'local-gas-station';
            default:
                return 'local-gas-station';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <VStack className="flex-1">
                {/* Top App Bar */}
                <View className="flex flex-row justify-between items-center bg-background-light/80 dark:bg-background-dark/80 px-4 pb-2">
                    <Pressable
                        className="flex justify-center items-center w-12 h-12 shrink-0"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={24}
                            color={isDark ? '#FFFFFF' : '#18181B'}
                        />
                    </Pressable>
                    <Text className="flex-1 font-bold text-white text-lg text-center leading-tight tracking-tight">
                        Détails du Véhicule
                    </Text>
                    <Pressable
                        className="flex justify-center items-center w-12 h-12"
                        onPress={handleShare}
                    >
                        <MaterialIcons
                            name="share"
                            size={24}
                            color={isDark ? '#FFFFFF' : '#18181B'}
                        />
                    </Pressable>
                </View>

                {/* Main Content */}
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 180 }}
                >
                    {/* Header Image Carousel */}
                    <View className="px-4 py-3">
                        <CarImageCarousel
                            images={images}
                            height={Dimensions.get('screen').width * 0.6}
                            showPagination={true}
                        />
                    </View>

                    {/* Headline Text */}
                    <Text className="px-4 pt-3 pb-0 font-bold text-[32px] text-white leading-tight tracking-tight">
                        {car.name}
                    </Text>

                    {/* Body Text */}
                    <Text className="px-4 pt-1 pb-3 font-normal text-zinc-400 text-base leading-normal">
                        {car.year}
                    </Text>

                    {/* Text Grid */}
                    <View className="flex flex-row flex-wrap gap-3 px-4">
                        <View className="flex flex-row flex-1 items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-lg" style={{ minWidth: '45%' }}>
                            <MaterialIcons name="settings" size={24} color="#71717A" />
                            <Text className="font-bold text-white text-base leading-tight">
                                {car.transmission}
                            </Text>
                        </View>
                        <View className="flex flex-row flex-1 items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-lg" style={{ minWidth: '45%' }}>
                            <MaterialIcons name={getFuelIcon()} size={24} color="#71717A" />
                            <Text className="font-bold text-white text-base leading-tight">
                                {car.fuel}
                            </Text>
                        </View>
                        <View className="flex flex-row flex-1 items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-lg" style={{ minWidth: '45%' }}>
                            <MaterialIcons name="location-on" size={24} color="#71717A" />
                            <Text className="font-bold text-white text-base leading-tight">
                                {car.location}
                            </Text>
                        </View>
                        <View className="flex flex-row flex-1 items-center gap-3 bg-zinc-900 p-4 border border-zinc-800 rounded-lg" style={{ minWidth: '45%' }}>
                            <MaterialIcons name="speed" size={24} color="#71717A" />
                            <Text className="font-bold text-white text-base leading-tight">
                                {car.mileage}
                            </Text>
                        </View>
                    </View>

                    {/* Pricing Section */}
                    <View className="flex flex-col gap-4 mt-4 px-4">
                        <View className="bg-primary/20 p-4 border border-primary/30 rounded-xl">
                            <Text className="font-medium text-zinc-300 text-sm">Prix de Location</Text>
                            <Text className="font-bold text-primary text-3xl">
                                {car.rentalPrice} Ar{' '}
                                <Text className="font-medium text-primary text-lg">/ jour</Text>
                            </Text>
                        </View>
                        <View className="bg-zinc-900 p-4 border border-zinc-800 rounded-xl">
                            <Text className="font-medium text-zinc-400 text-sm">Prix de Vente</Text>
                            <Text className="font-bold text-white text-3xl">{car.salePrice} Ar</Text>
                        </View>
                    </View>

                    {/* Tabbed Information Panel */}
                    <View className="px-4 py-6">
                        <View className="relative flex flex-row border-zinc-800 border-b">
                            {/* Animated Indicator */}
                            <Animated.View
                                style={[
                                    {
                                        position: 'absolute',
                                        bottom: 0,
                                        height: 2,
                                        width: tabWidth,
                                        backgroundColor: '#D40000',
                                    },
                                    useAnimatedStyle(() => ({
                                        transform: [{ translateX: indicatorPosition.value }],
                                    })),
                                ]}
                            />

                            <Pressable
                                className="flex-1 px-4 py-3"
                                onPress={() => setActiveTab('Description')}
                            >
                                <Animated.Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            textAlign: 'center',
                                            fontWeight: activeTab === 'Description' ? 'bold' : '500',
                                            color: activeTab === 'Description' ? '#D40000' : '#71717A',
                                        },
                                        useAnimatedStyle(() => ({
                                            transform: [{ scale: descScale.value }],
                                        })),
                                    ]}
                                >
                                    Description
                                </Animated.Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 px-4 py-3"
                                onPress={() => setActiveTab('Spécifications')}
                            >
                                <Animated.Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            textAlign: 'center',
                                            fontWeight: activeTab === 'Spécifications' ? 'bold' : '500',
                                            color: activeTab === 'Spécifications' ? '#D40000' : '#71717A',
                                        },
                                        useAnimatedStyle(() => ({
                                            transform: [{ scale: specScale.value }],
                                        })),
                                    ]}
                                >
                                    Spécifications
                                </Animated.Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 px-4 py-3"
                                onPress={() => setActiveTab('Avis')}
                            >
                                <Animated.Text
                                    style={[
                                        {
                                            fontSize: 14,
                                            textAlign: 'center',
                                            fontWeight: activeTab === 'Avis' ? 'bold' : '500',
                                            color: activeTab === 'Avis' ? '#D40000' : '#71717A',
                                        },
                                        useAnimatedStyle(() => ({
                                            transform: [{ scale: avisScale.value }],
                                        })),
                                    ]}
                                >
                                    Avis
                                </Animated.Text>
                            </Pressable>
                        </View>
                        <Animated.View
                            className="pt-4"
                            style={useAnimatedStyle(() => ({
                                opacity: contentOpacity.value,
                                transform: [{ translateY: contentTranslateY.value }],
                            }))}
                        >
                            {activeTab === 'Description' && (
                                <Text className="text-zinc-300 text-base leading-relaxed">
                                    {car.description}
                                </Text>
                            )}
                            {activeTab === 'Spécifications' && (
                                <Text className="text-zinc-300 text-base leading-relaxed">
                                    Spécifications détaillées du véhicule à venir...
                                </Text>
                            )}
                            {activeTab === 'Avis' && (
                                <Text className="text-zinc-300 text-base leading-relaxed">
                                    Avis des clients à venir...
                                </Text>
                            )}
                        </Animated.View>
                    </View>
                </ScrollView>

                {/* CTA Footer */}
                <View className="right-0 bottom-0 left-0 z-10 absolute bg-background-dark/80 p-4 pt-3 border-zinc-800 border-t w-full" style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                    <View className="flex flex-col gap-3">
                        <View className="flex flex-row items-center gap-3">
                            <Pressable
                                className="flex-1 bg-zinc-800 px-6 py-3.5 rounded-lg"
                                onPress={handleBuy}
                            >
                                <Text className="font-bold text-white text-base text-center">Acheter</Text>
                            </Pressable>
                            <Pressable
                                className="flex-1 bg-primary px-6 py-3.5 rounded-lg"
                                onPress={handleRent}
                            >
                                <Text className="font-bold text-white text-base text-center">
                                    Louer maintenant
                                </Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={handleMakeOffer}>
                            <Text className="font-medium text-primary text-sm text-center">
                                Faire une offre
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </VStack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default CarDetailScreen;

