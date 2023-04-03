import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'

import { AdvancedCarousel } from './AdvancedCarousel/AdvancedCarousel'
import { Carousel3DAnimation } from './Carouse3DlAnimation/3DCarouselAnimation'
import { CarouselAnimation } from './CarouselAnimation/CarouselAnimation'
import { CountdownTimerAnimation } from './CountdownTimerAnimation/CountdownTimerAnimation'
import { Home } from './Home'
import { ScrollItemAnimation } from './ScrollItemAnimation/ScrollItemAnimation'
import { StickyFooter } from './StickyFooter/StickyFooter'
import { SyncedFlatLists } from './SyncedFlatLists/SyncedFlatLists'
import { RootStackType } from './types'

const Stack = createNativeStackNavigator<RootStackType>()

export const Main = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'SyncedFlatLists'} component={SyncedFlatLists} />
        <Stack.Screen name={'ScrollItemAnimation'} component={ScrollItemAnimation} />
        <Stack.Screen name={'CarouselAnimation'} component={CarouselAnimation} />
        <Stack.Screen name={'Carouse3DlAnimation'} component={Carousel3DAnimation} />
        <Stack.Screen name={'StickyFooter'} component={StickyFooter} />
        <Stack.Screen name={'CountdownTimerAnimation'} component={CountdownTimerAnimation} />
        <Stack.Screen name={'AdvancedCarousel'} component={AdvancedCarousel} />
      </Stack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
