import React from 'react'

import { StyleSheet, View } from 'react-native'

import { Button } from '../common/Button'
import { PADDING, WIDTH } from '../constants/constants'

import { AdvancedCarousel } from './AdvancedCarousel/AdvancedCarousel'
import { SyncedFlatLists } from './SyncedFlatLists/SyncedFlatLists'
import { useAppNavigation } from './types'

export const Home = () => {
  const { navigate } = useAppNavigation()

  return (
    <View style={styles.container}>
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'SyncedFlatLists'}
        onPress={() => navigate('SyncedFlatLists')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'ScrollItemAnimation'}
        onPress={() => navigate('ScrollItemAnimation')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'CarouselAnimation'}
        onPress={() => navigate('CarouselAnimation')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'Carouse3DlAnimation'}
        onPress={() => navigate('Carouse3DlAnimation')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'StickyFooter'}
        onPress={() => navigate('StickyFooter')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'CountdownTimerAnimation'}
        onPress={() => navigate('CountdownTimerAnimation')}
        style={styles.button}
      />
      <Button
        fontSize={24}
        color={'rgba(50,142,218,0.73)'}
        fontWeight={'500'}
        title={'AdvancedCarousel'}
        onPress={() => navigate('AdvancedCarousel')}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    paddingHorizontal: PADDING,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    width: WIDTH - PADDING * 2,
  },
})
