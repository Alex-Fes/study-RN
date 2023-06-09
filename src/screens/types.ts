import { NavigationProp, useNavigation } from '@react-navigation/native'

export type RootStackType = {
  Home: undefined
  SyncedFlatLists: undefined
  ScrollItemAnimation: undefined
  CarouselAnimation: undefined
  Carouse3DlAnimation: undefined
  StickyFooter: undefined
  CountdownTimerAnimation: undefined
  AdvancedCarousel: undefined
  ParallaxCarousel: undefined
  AdvancedFlatListCarousel: undefined
}
type UseNavigationType = NavigationProp<RootStackType>
export const useAppNavigation = () => useNavigation<UseNavigationType>()
