import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface PaymentParams {
    total?: string;
    days?: string;
    startDateId?: string;
    endDateId?: string;
    carId?: string;
}

interface PaymentOption {
    id: string;
    label: string;
    logoUri?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    logoBackground?: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        id: 'mvola',
        label: 'Mvola',
        logoUri:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAA3Wlpdk1F28bwzLzj3xoqiXLKKTk9fQRop3pwxmzArfXG_ZGzot7xc6tcU2G0gxPZ8JaCFOemSjtiCMrIHzKjg1O1SZwwvc6YcVZUe5FlZXboN9nz8f8vvJ4AqUqmJDk3k_W4Olobta8Y5wR5HYlVzp871c9m8rnLsUhCOA2u-JP3JUPfhzm4-qGLOYvzuOAMJi6yh0zNEYaMxBjwXsZWfZpOyrr1vkfyYrU5xG24AQH8873XU3micun2qSa8q_lv4srm34buM8E',
        logoBackground: '#ffffff',
    },
    {
        id: 'orange-money',
        label: 'Orange Money',
        logoUri:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBKbLRAYUGDSTPrlmPgbiL5V8wdhY79JvBrusSVWuDAK0EKb8rJzntgS6zRsKLKnpwjYlAY6fHJBdCx4632lwr0LFyT0mBl9eo4UfK5uOgGdQ-yt07_GQSATWVt5E01eaASkJHjXDgwEvfuyhfvfIlyJ1lGWXtpxzN9301i2U6zmZA8K65NOPg9poFOjhDXhmHntUWY2xLbeAVPKzdyHovz8nz7dnqi4qLLw-_pZwD_K8689W-Wb7YhtnA1In63iXbnHeNFyO9HfwY',
        logoBackground: '#000000',
    },
    {
        id: 'airtel-money',
        label: 'Airtel Money',
        logoUri:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfPpGdnkBUM1kPWhYB-FzcbSOrx0w2O5QBP8pxtfn9rCRxGWfmR0oUh6Dcvt-HxIsmug0E-D5GS8ziToSA_uHc8zxvLIMarpO6rMn_MMbM0RhHWIaS-gLnHV_VOQhOdcgYcjJGVYIsGI5-TbIHLAMrYEsut1nUXgvxItO1TH8c-5v9jbF-mQRH7KwTUmj129CKYkzZJWhrNe73lnRUt9BTg9HPzaG_DNF43kGwNKbhgSJaMoh_0cnwAgXoyuPDlGEw_62nHhLPgIU',
        logoBackground: '#ffffff',
    },
    {
        id: 'bank-transfer',
        label: 'Virement Bancaire',
        icon: 'account-balance',
    },
];

const PaymentScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams() as PaymentParams;

    const [selectedMethod, setSelectedMethod] = useState<string>(PAYMENT_OPTIONS[0].id);

    const totalAmount = useMemo(() => {
        const numericTotal = params.total ? Number(params.total) : 0;
        return Number.isFinite(numericTotal) ? numericTotal : 0;
    }, [params.total]);

    const formattedTotal = useMemo(
        () => totalAmount.toLocaleString('fr-FR') + ' Ar',
        [totalAmount],
    );

    const days = params.days ? Number(params.days) : undefined;

    const cardBackground = isDark ? '#351818' : '#ffffff';
    const cardBorder = isDark ? '#6a2f2f' : '#e5e7eb';
    const secondaryText = isDark ? '#BDBDBD' : '#4b5563';
    const primaryText = isDark ? '#F5F5F5' : '#111827';

    const handleConfirm = () => {
        console.log('Payment method selected:', {
            method: selectedMethod,
            total: totalAmount,
            days,
            startDateId: params.startDateId,
            endDateId: params.endDateId,
            carId: params.carId,
        });
        // TODO: integrate payment flow
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <VStack className="flex-1">
                {/* Top App Bar */}
                <View className="top-0 z-10 sticky flex flex-row items-center bg-background-light dark:bg-background-dark/90 px-screenX py-3">
                    <TouchableOpacity
                        className="flex justify-start items-center size-12"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={24}
                            color={isDark ? '#F5F5F5' : '#111827'}
                        />
                    </TouchableOpacity>
                    <Text
                        className="flex-1 font-bold text-lg text-center"
                        style={{ color: isDark ? '#F5F5F5' : '#111827' }}
                    >
                        Sélection du Paiement
                    </Text>
                    <View className="w-12" />
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16, paddingTop: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Total Card */}
                    <View
                        className="rounded-xl"
                        style={{
                            backgroundColor: cardBackground,
                            borderColor: cardBorder,
                            borderWidth: 1,
                        }}
                    >
                        <View className="flex flex-col gap-1 p-5 w-full">
                            <Text style={{ color: secondaryText }} className="text-base">
                                Total à Payer
                            </Text>
                            <View className="flex flex-row justify-between items-end">
                                <Text
                                    className="font-bold text-3xl leading-tight tracking-tight"
                                    style={{ color: primaryText }}
                                >
                                    {formattedTotal}
                                </Text>
                                {days ? (
                                    <Text style={{ color: secondaryText }} className="text-sm">
                                        {days} {days > 1 ? 'jours' : 'jour'}
                                    </Text>
                                ) : null}
                            </View>
                        </View>
                    </View>

                    {/* Payment Methods */}
                    <View className="flex flex-col gap-4 mt-6">
                        <Text
                            className="font-bold text-[22px] leading-tight"
                            style={{ color: primaryText }}
                        >
                            Choisissez une méthode de paiement
                        </Text>

                        <View className="flex flex-col gap-3">
                            {PAYMENT_OPTIONS.map((option) => {
                                const isSelected = selectedMethod === option.id;
                                return (
                                    <TouchableOpacity
                                        key={option.id}
                                        onPress={() => setSelectedMethod(option.id)}
                                        className="flex flex-row items-center gap-4 p-4 rounded-lg"
                                        style={{
                                            backgroundColor: cardBackground,
                                            borderColor: isSelected ? '#d10505' : cardBorder,
                                            borderWidth: 1,
                                        }}
                                    >
                                        <View
                                            className="justify-center items-center rounded-lg size-10 overflow-hidden"
                                            style={{ backgroundColor: option.logoBackground ?? '#4a2121' }}
                                        >
                                            {option.logoUri ? (
                                                <Image
                                                    source={{ uri: option.logoUri }}
                                                    className="size-10"
                                                    resizeMode="contain"
                                                />
                                            ) : (
                                                <MaterialIcons
                                                    name={option.icon ?? 'account-balance'}
                                                    size={24}
                                                    color={primaryText}
                                                />
                                            )}
                                        </View>

                                        <Text
                                            className="flex-1 font-medium text-base"
                                            style={{ color: primaryText }}
                                            numberOfLines={1}
                                        >
                                            {option.label}
                                        </Text>

                                        <View
                                            className="justify-center items-center border-2 rounded-full size-6"
                                            style={{
                                                borderColor: isSelected ? '#d10505' : cardBorder,
                                            }}
                                        >
                                            {isSelected ? (
                                                <View
                                                    className="rounded-full size-3"
                                                    style={{ backgroundColor: '#d10505' }}
                                                />
                                            ) : null}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>

                {/* Floating CTA */}
                <View
                    className="right-0 bottom-0 left-0 absolute px-screenX pt-3 pb-4"
                    style={{ paddingBottom: Math.max(insets.bottom + 12, 24), backgroundColor: isDark ? '#230f0f' : '#f8f5f5' }}
                >
                    <TouchableOpacity
                        className="bg-primary px-6 py-4 rounded-lg w-full"
                        onPress={handleConfirm}
                    >
                        <Text className="font-bold text-white text-lg text-center">
                            Confirmer le Paiement
                        </Text>
                    </TouchableOpacity>
                </View>
            </VStack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // Reserved for potential shared styles
});

export default PaymentScreen;


