import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeaturedCar {
  id: string;
  name: string;
  price: string;
  location: string;
  imageUrl: string;
  type: 'À Vendre' | 'À Louer';
}

interface RecentCar {
  id: string;
  name: string;
  price: string;
  location: string;
  imageUrl: string;
  type: 'À Vendre' | 'À Louer';
}

const featuredCars: FeaturedCar[] = [
  {
    id: '1',
    name: 'Ford Mustang GT',
    price: '150,000,000 Ar',
    location: 'Antananarivo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9eqrXLiEnh5T7WaM93C88x7pXwxgsWnOTy8mpT07dJWLFiRbnsZYP-mT7fY2SKBmXODMsWeP2iZeRWBc3ttafi3JzMFp1yUyh_nF_fhiHpS5PzHkTvjLFJ3YBiHRgvHb4E7kQPhHwveZQSdTRImuDsC-w4d51TZk6hgt0Dg_BAtoIvfWSSaKnKQY-tRUfm1GnLu1z5Xh0642V-2WZ81A9AApeSMBklEmoeXbguTnbghxDShtikXwmjjoi1wjvmXsss5GfUDzddnQ',
    type: 'À Vendre',
  },
  {
    id: '2',
    name: 'BMW M4',
    price: '250,000,000 Ar',
    location: 'Antananarivo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOYYasCL2PIuLyZMrqIdx0t7O0n_VZsOW37jByIbvuPj7n3nmtrUH0a4dVYrRpWUqBzaZg3BydUpWxGhnM5t2QC1skB76JQw_EmkEDBdEJcE-r7ACcF0TaWTDd179pJWa3RVfjiGtXl2gENBYYU1Cv58hSpVGdZoL9csaWZthU-zRI8trfIcw80osGto2Lh-I61e8TqiW0qS7_3Kv76aTcvpr07CChUbS1t6z0Pg5mXZQp9hjpDXiD0dPgNhPSNshAjKyS-yqX0UA',
    type: 'À Louer',
  },
  {
    id: '3',
    name: 'Porsche 911',
    price: '400,000,000 Ar',
    location: 'Toamasina',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCniX2_hnyOQmwHGfM-Ic0upG2BYF8Wh-xfHLqP1s-9UzP2imEd-JosjWyZTqGD6QrJGRBR5AuExgwyRthotYktHQZgS2fCXUeHNaYOOLY_3do4WZCBiEPVqlD68EWxr2HAVPwhjhoerV2ZDfIGjw5LR64SOd2Wk7YxUj4wDx0YPA92qdSWCAjKA_k3B0u1nniNwvhhdzETGOt1P6FAnX0fMKCfBmfRTSt0_2g0lMjFVX7wpHRmf4tCloHH_oKMFC5604ScLts0sv0',
    type: 'À Vendre',
  },
];

const recentCars: RecentCar[] = [
  {
    id: '4',
    name: 'Audi R8',
    price: '380,000,000 Ar',
    location: 'Antananarivo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGU6lIhe-U1FFI3JQr6eKkI18Pw5BaJ9SAs7rfK3kBlZISjEf_AFh6s2QH198CyYFntEgp2ZYoz-Yvbz3Qbpj2Ry4R3SkonQQxlwTFgQCgCTwsxSKjFzyOsn5p30YCgX60doRZLsaD6zoxrAToxdAV8Dw_pAhNQ8Le51uEfbY5AQP2izXNc3N3M4nFa73K1xtXM1KZ_CplByXmmpVrYdUKVIEmKUBcskAXUAzGx77HCxsRO8kksbtG77xZ-8xBKIms1A9Dzmmrwos',
    type: 'À Vendre',
  },
  {
    id: '5',
    name: 'Mercedes-AMG GT',
    price: '350,000,000 Ar',
    location: 'Mahajanga',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrZhx70bsmIs0JMcZUndY-hUIhP9ulY84x03I9Jciy-IZ-JKRPiSMb8wARrn89LQayfBzzqnTuhBVepdfvtEADKBgtgEWYlj3YrMpsVv5bbw0Vit7n983eOvBKfdhPaQaWRrp037UiEugu0HB5rLDTiwXp1F_Q3J1ywH24dww8xgNWlRbqmZBkMbt-N7C43KJi8JbrpDZL1ynuuce0L4eA7KOc5Pk6n8s76tXuITWHzw0wO6mmM2MR_MGKdRrHfzIxNcZOMN4pi5k',
    type: 'À Louer',
  },
  {
    id: '6',
    name: 'McLaren 720S',
    price: '950,000,000 Ar',
    location: 'Antananarivo',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU-aVLplCMabYOntLSb95IfqPi0TZiDBsQ6_lG-_90RWVd4HR1CQb1E0g0JLcC2uheB6tb6rd6_gHExoodWs7GE2E75tNneEjaXQb79RQXSnTRG80XHscDcFLzgiA7X2DEY4oau7Ai9xBSxEaQrL_M8FdEYdF_sUdu8Nn_uWdI1HXURCWHKGu90f8TniGku5tWO8GVyXn5EJ-5ptS77RIx4j0vQEPUIPz8QxyA2djy0eTR_AmWgdTwOWH3NlgzaQdDem95lUcFvxc',
    type: 'À Vendre',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '../recherche',
        params: { query: searchQuery.trim() },
      });
    } else {
      router.push('../recherche');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <VStack className="flex-1">
        {/* Top App Bar */}
        <HStack className="justify-between items-center bg-background-light dark:bg-background-dark px-4 pb-2">
          <View className="flex justify-start items-center w-12 h-12 shrink-0">
            <Image
              source={require('@/assets/images/icon.png')}
              className="w-12 h-12"
              contentFit="contain"
            />
          </View>
          <Text className="flex-1 font-bold text-slate-900 dark:text-white text-lg text-center leading-tight tracking-tight">
            Accueil
          </Text>
          <View className="flex justify-end items-center w-12">
            <Pressable className="flex justify-center items-center bg-transparent rounded-full w-10 h-10 overflow-hidden">
              <MaterialIcons
                name="notifications"
                size={24}
                color={isDark ? '#C0C0C0' : '#475569'}
              />
            </Pressable>
          </View>
        </HStack>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Search Bar */}
          <View className="px-4 py-3">
            <Pressable onPress={handleSearch}>
              <Input
                variant="outline"
                size="xl"
                className="bg-slate-200 dark:bg-gray-800/50 border-none rounded-lg"
              >
                <InputSlot className="pl-2">
                  <InputIcon as={() => <MaterialIcons name="search" size={20} color={isDark ? '#64748B' : '#94A3B8'} />} size="md" />
                </InputSlot>
                <InputField
                  placeholder="Rechercher..."
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  className="bg-transparent pl-2 border-none rounded-l-none text-slate-900 dark:text-white"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
              </Input>
            </Pressable>
          </View>

          {/* Section Header: Voitures en Vedette */}
          <Text className="px-4 pt-4 pb-2 font-bold text-slate-900 dark:text-white text-lg leading-tight tracking-tight">
            Voitures en Vedette
          </Text>

          {/* Carousel: Voitures en Vedette */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
          >
            <HStack className="items-stretch" space="md">
              {featuredCars.map((car) => (
                <VStack
                  key={car.id}
                  className="flex flex-col flex-1 rounded-lg min-w-[256px] h-full"
                  space="md"
                >
                  <View className="relative rounded-xl w-full overflow-hidden" style={{ aspectRatio: 16 / 9 }}>
                    <Image
                      source={{ uri: car.imageUrl }}
                      className="w-full h-full"
                      contentFit="cover"
                    />
                    <View className="top-2 right-2 absolute bg-primary/90 rounded-full">
                      <Text className="px-2 py-1 font-semibold text-white text-xs">
                        {car.type}
                      </Text>
                    </View>
                  </View>
                  <VStack space="xs">
                    <Text className="font-bold text-slate-900 dark:text-white text-base leading-normal">
                      {car.name}
                    </Text>
                    <Text className="font-normal text-slate-600 dark:text-slate-400 text-sm leading-normal">
                      {car.price} • {car.location}
                    </Text>
                  </VStack>
                </VStack>
              ))}
            </HStack>
          </ScrollView>

          {/* Section Header: Récemment Ajoutées */}
          <Text className="px-4 pt-6 pb-2 font-bold text-slate-900 dark:text-white text-lg leading-tight tracking-tight">
            Récemment Ajoutées
          </Text>

          {/* Vertical List: Récemment Ajoutées */}
          <VStack className="px-4 pb-6" space="md">
            {recentCars.map((car) => (
              <HStack
                key={car.id}
                className="items-center bg-slate-100 dark:bg-gray-800/40 p-2 rounded-xl"
                space="md"
              >
                <View className="rounded-lg w-24 h-20 overflow-hidden">
                  <Image
                    source={{ uri: car.imageUrl }}
                    className="w-full h-full"
                    contentFit="cover"
                  />
                </View>
                <VStack className="flex-1" space="xs">
                  <Text className="font-bold text-slate-900 dark:text-white text-base leading-normal">
                    {car.name}
                  </Text>
                  <Text className="font-normal text-slate-600 dark:text-slate-400 text-sm leading-normal">
                    {car.price} • {car.location}
                  </Text>
                  <Text className="mt-1 font-medium text-primary text-xs leading-normal">
                    {car.type}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
