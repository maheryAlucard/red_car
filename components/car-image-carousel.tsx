import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width;

interface CarImageCarouselProps {
    images: string[];
    height?: number;
    showPagination?: boolean;
}

export const CarImageCarousel: React.FC<CarImageCarouselProps> = ({
    images,
    height = PAGE_WIDTH * 0.6,
    showPagination = true,
}) => {
    const progress = useSharedValue<number>(0);
    const ref = React.useRef<ICarouselInstance>(null);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const renderItem = ({ item }: { item: string }) => {
        return (
            <Image
                source={{ uri: item }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                contentFit="cover"
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.carouselWrapper}>
                <Carousel
                    ref={ref}
                    width={Dimensions.get('screen').width}
                    height={height}
                    data={images}
                    loop={images.length > 1}
                    pagingEnabled={true}
                    snapEnabled={true}
                    vertical={false}
                    onProgressChange={progress}
                    renderItem={renderItem}
                    mode="horizontal-stack"
                />
                {/* Pagination overlay */}
                {showPagination && images.length > 1 && (
                    <View style={styles.paginationContainer}>
                        <Pagination.Basic
                            progress={progress}
                            data={images}
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                            containerStyle={styles.paginationWrapper}
                            horizontal
                            onPress={onPressPagination}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    carouselWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingBottom: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationWrapper: {
        gap: 8,
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
    },
});

