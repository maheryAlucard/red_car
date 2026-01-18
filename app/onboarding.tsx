import { VStack } from '@/components/ui/vstack';
import { Image, ImageSource } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingPage {
  imageSource: ImageSource;
  headline: string;
  bodyText: string;
  showSkipInHeader: boolean;
  backgroundColor?: string;
}

const onboardingPages: OnboardingPage[] = [
  {
    imageSource: require('@/assets/images/onboarding/page1.png'),
    headline: 'Trouvez votre voiture',
    bodyText: 'Parcourez des centaines de véhicules disponibles à travers Madagascar en quelques clics.',
    showSkipInHeader: true,
  },
  {
    imageSource: require('@/assets/images/onboarding/page2.png'),
    headline: 'Louez ou Vendez Votre Véhicule',
    bodyText: "Gagnez de l'argent facilement en mettant votre voiture en location ou en vente sur notre plateforme de confiance, accessible à des milliers de clients.",
    showSkipInHeader: false,
    backgroundColor: 'bg-background-dark-alt',
  },
  {
    imageSource: require('@/assets/images/onboarding/page3.png'),
    headline: 'Transactions 100% Sécurisées',
    bodyText: 'Achetez, vendez et louez en toute confiance. Nous garantissons la sécurité de vos paiements et la protection de vos informations personnelles et financières.',
    showSkipInHeader: false,
    backgroundColor: 'bg-background-dark-alt',
  },
];

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface OnboardingImageProps {
  imageSource: ImageSource;
  currentPage: number;
  delay?: number;
  containerClassName?: string;
  maxHeight: number;
}

const OnboardingImage: React.FC<OnboardingImageProps> = ({
  imageSource,
  currentPage,
  delay = 300,
  containerClassName = 'px-screenX py-3',
  maxHeight,
}) => {
  return (
    <View className={containerClassName}>
      <AnimatedView
        entering={FadeIn.delay(delay).duration(500)}
        className="flex-col justify-end bg-transparent rounded-lg w-full overflow-hidden"
        style={{ height: maxHeight }}
      >
        <Image
          source={imageSource}
          className="flex-1 rounded-lg w-full min-h-0"
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          recyclingKey={currentPage.toString()}
        />
      </AnimatedView>
    </View>
  );
};

interface PageIndicatorProps {
  index: number;
  isActive: boolean;
  isSecondPage: boolean;
  isThirdPage: boolean;
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ index, isActive, isSecondPage, isThirdPage }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isActive ? 20 : 8, {
        damping: 15,
        stiffness: 150,
      }),
    };
  });

  const getIndicatorColor = () => {
    if (isActive) return 'bg-primary';
    if (isThirdPage) return 'bg-primary/30';
    if (isSecondPage) return 'bg-white/30';
    return 'bg-gray-700 dark:bg-gray-600';
  };

  return (
    <AnimatedView
      style={animatedStyle}
      className={`h-2 rounded-full ${getIndicatorColor()}`}
    />
  );
};

const OnboardingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = onboardingPages.length;
  const { height: windowHeight } = useWindowDimensions();
  // Image height scales with viewport; reserve space for text, indicators, button. Kept in 120–260px.
  const maxImageHeight = Math.min(260, Math.max(120, (windowHeight - 120) * 0.34));

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Last page, navigate to main app
      router.replace('/(tabs)');
    }
  };

  const currentPageData = onboardingPages[currentPage];

  const isSecondPage = currentPage === 1;
  const isThirdPage = currentPage === 2;
  const backgroundClass = isSecondPage || isThirdPage
    ? 'bg-background-light dark:bg-background-dark-alt'
    : 'bg-background-light dark:bg-background-dark';

  return (
    <SafeAreaView className={`flex-1 ${backgroundClass}`}>
      <View className="flex-1 h-screen-safe">
        <VStack className="flex-1 min-h-0">
          {/* Main Content */}
          <AnimatedView
            key={currentPage}
            entering={SlideInRight.duration(300)}
            exiting={SlideOutLeft.duration(200)}
            className="flex-1"
          >
            {isThirdPage ? (
              // Third page layout: Indicators at top, image in middle, text below, button at bottom
              <>
                {/* Page Indicators at Top */}
                <AnimatedView
                  entering={FadeIn.delay(100).duration(400)}
                  className="flex-row justify-center items-center gap-3 pt-4 pb-3"
                >
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PageIndicator
                      key={index}
                      index={index}
                      isActive={index === currentPage}
                      isSecondPage={isSecondPage}
                      isThirdPage={isThirdPage}
                    />
                  ))}
                </AnimatedView>

                {/* Main Content */}
                <AnimatedView
                  entering={FadeIn.delay(200).duration(400)}
                  className="flex-col flex-1 justify-center min-h-0"
                >
                  {/* Image */}
                  <OnboardingImage
                    imageSource={currentPageData.imageSource}
                    currentPage={currentPage}
                    delay={300}
                    maxHeight={maxImageHeight}
                  />

                  {/* Text Content */}
                  <AnimatedView
                    entering={FadeIn.delay(400).duration(400)}
                    className="text-center shrink-0"
                  >
                    <AnimatedText
                      entering={FadeIn.delay(500).duration(400)}
                      className="px-4 pt-4 pb-2 font-display font-bold text-[32px] text-black dark:text-white text-center leading-tight tracking-tight"
                    >
                      {currentPageData.headline}
                    </AnimatedText>
                    <AnimatedText
                      entering={FadeIn.delay(600).duration(400)}
                      className="px-screenX pt-1 pb-2 font-display font-normal text-zinc-600 dark:text-zinc-400 text-base text-center leading-normal"
                    >
                      {currentPageData.bodyText}
                    </AnimatedText>
                  </AnimatedView>
                </AnimatedView>

              </>
            ) : isSecondPage ? (
              // Second page layout: Image at top, text in middle, navigation at bottom
              <>
                {/* Top Section: Image */}
                <AnimatedView
                  entering={FadeIn.delay(100).duration(400)}
                  className="flex-col flex-1 justify-end min-h-0"
                >
                  <OnboardingImage
                    imageSource={currentPageData.imageSource}
                    currentPage={currentPage}
                    delay={200}
                    containerClassName="px-screenX pt-4"
                    maxHeight={maxImageHeight}
                  />
                </AnimatedView>

                {/* Middle Section: Text Content */}
                <AnimatedView
                  entering={FadeIn.delay(300).duration(400)}
                  className="flex-col items-center pt-4 shrink-0"
                >
                  <AnimatedText
                    entering={FadeIn.delay(400).duration(400)}
                    className="px-4 pt-4 pb-2 font-display font-bold text-[32px] text-white text-center leading-tight tracking-tight"
                  >
                    {currentPageData.headline}
                  </AnimatedText>
                  <AnimatedText
                    entering={FadeIn.delay(500).duration(400)}
                    className="px-screenX pt-1 pb-2 max-w-md font-display font-normal text-white/80 text-base text-center leading-normal"
                  >
                    {currentPageData.bodyText}
                  </AnimatedText>
                </AnimatedView>

                {/* Bottom Section: Navigation */}
                <AnimatedView
                  entering={FadeIn.delay(600).duration(400)}
                  className="flex-col justify-end items-center px-screenX pt-2 pb-5 shrink-0"
                >
                  {/* Page Indicators */}
                  <View className="flex-row justify-center items-center gap-3 py-3">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PageIndicator
                        key={index}
                        index={index}
                        isActive={index === currentPage}
                        isSecondPage={isSecondPage}
                        isThirdPage={isThirdPage}
                      />
                    ))}
                  </View>

                </AnimatedView>
              </>
            ) : (
              // First page layout: Header, centered content, bottom navigation
              <>
                {/* Main Content */}
                <AnimatedView
                  entering={FadeIn.delay(100).duration(400)}
                  className="flex-col flex-1 justify-center items-center px-screenX min-h-0"
                >
                  {/* Image */}
                  <OnboardingImage
                    imageSource={currentPageData.imageSource}
                    currentPage={currentPage}
                    delay={200}
                    containerClassName="py-2"
                    maxHeight={maxImageHeight}
                  />

                  {/* Headline Text */}
                  <AnimatedText
                    entering={FadeIn.delay(400).duration(400)}
                    className="pt-4 pb-2 font-display font-bold text-[32px] text-white text-center leading-tight tracking-tight"
                  >
                    {currentPageData.headline}
                  </AnimatedText>

                  {/* Body Text */}
                  <AnimatedText
                    entering={FadeIn.delay(500).duration(400)}
                    className="pt-1 pb-2 max-w-sm font-display font-normal text-[#A9A9A9] text-base text-center leading-normal"
                  >
                    {currentPageData.bodyText}
                  </AnimatedText>
                </AnimatedView>

                {/* Bottom Section */}
                <AnimatedView
                  entering={FadeIn.delay(600).duration(400)}
                  className="p-4 pb-5 shrink-0"
                >
                  {/* Page Indicators */}
                  <View className="flex-row justify-center items-center gap-3 py-3">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PageIndicator
                        key={index}
                        index={index}
                        isActive={index === currentPage}
                        isSecondPage={isSecondPage}
                        isThirdPage={isThirdPage}
                      />
                    ))}
                  </View>

                </AnimatedView>
              </>
            )}
          </AnimatedView>

          {/* Action button: no animation, text depends on current page */}
          <View className="items-center px-screenX py-5 w-full shrink-0">
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.9}
              className="flex justify-center items-center bg-primary px-5 rounded-lg w-full min-w-[84px] max-w-[480px] h-12 overflow-hidden"
            >
              <Text className="font-display font-bold text-white text-base truncate leading-normal tracking-[0.015em]">
                {currentPage === totalPages - 1 ? 'Commencer' : 'Suivant'}
              </Text>
            </TouchableOpacity>
          </View>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

