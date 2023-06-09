import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Animated,
  Dimensions,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native'

const { width, height } = Dimensions.get('window')
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
}

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5))
const ITEM_SIZE = width * 0.38
const ITEM_SPACING = (width - ITEM_SIZE) / 2

export const CountdownTimerAnimation = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const timerAnimation = useRef(new Animated.Value(height)).current
  const textInputAnimation = useRef(new Animated.Value(timers[0])).current
  const buttonAnimation = useRef(new Animated.Value(0)).current
  const inputRef = useRef<any>()

  useEffect(() => {
    const listener = textInputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      })
    })

    return () => {
      timerAnimation.removeListener(listener)
      textInputAnimation.removeAllListeners()
    }
  })

  const [duration, setDuration] = useState(timers[0])

  const animation = useCallback(() => {
    textInputAnimation.setValue(duration)
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      Vibration.cancel()
      Vibration.vibrate()
      textInputAnimation.setValue(duration)
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    })
  }, [duration])

  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  })
  const textOpacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const renderItem: ListRenderItem<number> = ({ item, index }) => {
    const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE]
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    })
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
    })

    return (
      <View style={{ width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Text style={[styles.text, { opacity, transform: [{ scale }] }]}>
          {item}
        </Animated.Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height,
            width,
            backgroundColor: colors.red,
            transform: [
              {
                translateY: timerAnimation,
              },
            ],
          },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity onPress={animation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            width: ITEM_SIZE,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            opacity: textOpacity,
          }}
        >
          <TextInput ref={inputRef} style={styles.text} defaultValue={duration.toString()} />
        </Animated.View>
        <Animated.FlatList
          data={timers}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          style={{ flexGrow: 0, opacity }}
          snapToInterval={ITEM_SIZE}
          decelerationRate={'fast'}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_SIZE)

            setDuration(timers[index])
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
})
