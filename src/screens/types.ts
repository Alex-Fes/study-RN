import { NavigationProp, useNavigation } from '@react-navigation/native'

export type RootStackType = {
  Home: undefined
  SyncedFlatLists: undefined
  ScrollItemAnimation: undefined
  CarouselAnimation: undefined
}
type UseNavigationType = NavigationProp<RootStackType>
export const useAppNavigation = () => useNavigation<UseNavigationType>()
