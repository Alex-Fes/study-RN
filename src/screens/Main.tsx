import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'

import { CarouselAnimation } from './CarouselAnimation/CarouselAnimation'
import { Home } from './Home'
import { ScrollItemAnimation } from './ScrollItemAnimation/ScrollItemAnimation'
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
      </Stack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
