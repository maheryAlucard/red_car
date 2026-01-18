import { VStack } from '@/components/ui/vstack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Calendar, toDateId, useDateRange } from '@marceloterreiro/flash-calendar';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface RentParams {
    carId?: string;
    rentalPrice?: string;
}

const RentScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const searchParams = useLocalSearchParams();
    const params: RentParams = {
        carId: typeof searchParams.carId === 'string' ? searchParams.carId : undefined,
        rentalPrice: typeof searchParams.rentalPrice === 'string' ? searchParams.rentalPrice : undefined,
    };
    const insets = useSafeAreaInsets();

    // Get rental price from params or use default
    const dailyPrice = params.rentalPrice ? parseInt(params.rentalPrice.replace(/\s/g, '')) : 150000;

    // Use Flash Calendar's date range hook
    const {
        calendarActiveDateRanges,
        onCalendarDayPress,
        dateRange,
    } = useDateRange();

    // Get today's date ID for minimum date
    const today = useMemo(() => toDateId(new Date()), []);
    const todayDateId = today;

    // Convert date IDs to Date objects for calculations
    const selectedStartDate = useMemo(() => {
        if (!dateRange?.startId) return null;
        const [year, month, day] = dateRange.startId.split('-').map(Number);
        return new Date(year, month - 1, day);
    }, [dateRange?.startId]);

    const selectedEndDate = useMemo(() => {
        if (!dateRange?.endId) return null;
        const [year, month, day] = dateRange.endId.split('-').map(Number);
        return new Date(year, month - 1, day);
    }, [dateRange?.endId]);

    // Calculate total days and price
    const calculateTotal = () => {
        if (!selectedStartDate || !selectedEndDate) return { days: 0, total: 0 };
        const days = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const total = days * dailyPrice;
        return { days, total };
    };

    // Format date for display
    const formatDate = (date: Date | null): string => {
        if (!date) return '-';
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    const { days, total } = calculateTotal();

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <VStack className="flex-1">
                {/* Top App Bar */}
                <View className="top-0 z-10 sticky flex flex-row justify-between items-center bg-background-light dark:bg-background-dark px-4 border-white/10 border-b h-16 shrink-0">
                    <TouchableOpacity
                        className="flex justify-start items-center size-12"
                        onPress={() => router.back()}
                    >
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={24}
                            color={isDark ? '#F5F5F5' : '#1f2937'}
                        />
                    </TouchableOpacity>
                    <Text className="flex-1 font-bold text-typography-500 dark:text-typography-50 text-lg text-center">
                        Sélection des Dates
                    </Text>
                    <View className="w-12" />
                </View>

                {/* Main Content */}
                <View className="flex-1 px-screenX pt-4">
                    {/* Body Text */}
                    <Text
                        className="mb-4 text-text-secondary-light dark:text-text-secondary-dark text-base"
                        style={{ color: isDark ? '#BDBDBD' : '#6b7280' }}
                    >
                        Veuillez sélectionner la période de location.
                    </Text>

                    {/* Flash Calendar */}
                    <View style={{ flex: 1, minHeight: 400 }}>
                        <Calendar.List
                            calendarActiveDateRanges={calendarActiveDateRanges}
                            calendarInitialMonthId={todayDateId}
                            calendarMinDateId={todayDateId}
                            calendarFormatLocale="fr-FR"
                            onCalendarDayPress={onCalendarDayPress}
                        />
                    </View>
                </View>

                {/* Summary Footer */}
                <View
                    className="right-0 bottom-0 left-0 z-10 absolute bg-slate-900 dark:bg-slate-900 shadow-2xl px-screenX pt-4 border-white/10 border-t"
                    style={[
                        styles.footer,
                        {
                            paddingBottom: Math.max(insets.bottom, 16),
                        },
                    ]}
                >
                    <View className="space-y-4">
                        {/* Description List */}
                        <View className="flex flex-row justify-between gap-4">
                            <View className="flex-1">
                                <Text
                                    className="text-text-secondary-light dark:text-text-secondary-dark text-sm"
                                    style={{ color: isDark ? '#BDBDBD' : '#6b7280' }}
                                >
                                    Date de début
                                </Text>
                                <Text
                                    className="font-bold text-text-primary-light dark:text-text-primary-dark"
                                    style={{ color: isDark ? '#F5F5F5' : '#1f2937' }}
                                >
                                    {formatDate(selectedStartDate)}
                                </Text>
                            </View>
                            <View className="flex-1 text-right">
                                <Text
                                    className="text-text-secondary-light dark:text-text-secondary-dark text-sm"
                                    style={{ color: isDark ? '#BDBDBD' : '#6b7280' }}
                                >
                                    Date de fin
                                </Text>
                                <Text
                                    className="font-bold text-text-primary-light dark:text-text-primary-dark text-right"
                                    style={{ color: isDark ? '#F5F5F5' : '#1f2937' }}
                                >
                                    {formatDate(selectedEndDate)}
                                </Text>
                            </View>
                        </View>

                        {/* Headline Text / Price */}
                        <Text
                            className="font-bold text-text-primary-light dark:text-text-primary-dark text-lg text-center leading-tight tracking-tight"
                            style={{ color: isDark ? '#F5F5F5' : '#1f2937' }}
                        >
                            {days > 0
                                ? `Total: ${days} ${days === 1 ? 'jour' : 'jours'} × ${dailyPrice.toLocaleString('fr-FR')} Ar/jour = ${total.toLocaleString('fr-FR')} Ar`
                                : 'Sélectionnez vos dates'}
                        </Text>

                        {/* CTA Button */}
                        <TouchableOpacity
                            className="bg-primary shadow-lg shadow-primary/30 mt-4 py-3 rounded-lg w-full font-bold text-white text-base"
                            onPress={() => {
                                if (selectedStartDate && selectedEndDate && dateRange?.startId && dateRange?.endId) {
                                    router.push({
                                        pathname: '/payment',
                                        params: {
                                            startDateId: dateRange.startId,
                                            endDateId: dateRange.endId,
                                            total: total.toString(),
                                            days: days.toString(),
                                            carId: params.carId ?? '',
                                        },
                                    });
                                }
                            }}
                            disabled={!selectedStartDate || !selectedEndDate}
                            style={{
                                opacity: selectedStartDate && selectedEndDate ? 1 : 0.5,
                                marginTop: 16,
                            }}
                        >
                            <Text className="font-bold text-white text-base text-center">
                                Confirmer les dates
                            </Text>
                        </TouchableOpacity>
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
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 16,
    },
});

export default RentScreen;

