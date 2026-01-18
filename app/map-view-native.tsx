import { Image } from 'expo-image';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export interface SearchCar {
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

interface MapViewNativeProps {
    selectedCar: SearchCar | null;
}

const MapViewNative: React.FC<MapViewNativeProps> = ({ selectedCar }) => {
    let MapComponent: typeof AppleMaps.View | typeof GoogleMaps.View;
    if (Platform.OS === 'ios') {
        MapComponent = AppleMaps.View;
    } else if (Platform.OS === 'android') {
        MapComponent = GoogleMaps.View;
    } else {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-white">Maps are only available on Android and iOS</Text>
            </View>
        );
    }

    return (
        <View className="relative flex-1">
            <MapComponent style={StyleSheet.absoluteFillObject} />
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
                                <Pressable
                                    className="flex justify-center items-center bg-primary px-4 rounded-lg w-full h-10 overflow-hidden cursor-pointer"
                                    onPress={() =>
                                        router.push({ pathname: '/car-detail', params: { carId: selectedCar.id } })
                                    }
                                >
                                    <Text className="font-bold text-white text-sm truncate leading-normal">
                                        Voir les détails
                                    </Text>
                                </Pressable>
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
};

export default MapViewNative;
