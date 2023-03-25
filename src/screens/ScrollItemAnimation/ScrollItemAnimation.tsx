import React, { useRef } from 'react'

import { faker } from '@faker-js/faker'
import { Animated, Image, ListRenderItem, StatusBar, StyleSheet, Text, View } from 'react-native'

faker.seed(10)

const DATA = [...Array(30).keys()].map((_, index) => {
  return {
    key: faker.random.alphaNumeric(10),
    image: faker.image.avatar(),
    name: faker.name.fullName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  }
})

const SPACING = 20
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3
const BG_IMG = 'https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg'

export const ScrollItemAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  const renderItem: ListRenderItem<DataType> = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]

    const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)]

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    })
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    })

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          padding: SPACING,
          marginBottom: SPACING,
          backgroundColor: 'rgba(255,255,255, 0.8)',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          transform: [{ scale }],
          opacity,
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            marginRight: SPACING / 2,
          }}
        />
        <View
        // style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
          <Text style={{ fontSize: 18, opacity: 0.7 }}>{item.jobTitle}</Text>
          <Text style={{ fontSize: 18, opacity: 0.8, color: '#0099cc' }}>{item.email}</Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: BG_IMG }} style={StyleSheet.absoluteFillObject} />
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
})

type DataType = {
  key: string
  image: string
  name: string
  jobTitle: string
  email: string
}
