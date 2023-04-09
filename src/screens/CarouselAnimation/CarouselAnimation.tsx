import React, { useRef } from 'react'

import { Animated, Image, ListRenderItem, StatusBar, StyleSheet, View } from 'react-native'

import { WIDTH } from '../../constants/constants'

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/7118135/media/6984f7984b1052b9bdd5f2e29027ebc9.jpg?compress=1&resize=1600x1200&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/8159457/media/9e7bfb83b0bd704e941baa7a44282b22.jpg?compress=1&resize=1600x1200&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/6917895/samji_illustrator_4x.jpg?compress=1&resize=1600x1200&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/6766582/samji_illusstrator_4x.jpeg?compress=1&resize=700x525&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator_4x.jpeg?compress=1&resize=700x525&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/10789882/media/a2b6545f0310ef683389c8d3e6b28ef7.jpg?compress=1&resize=700x525&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/6955935/media/cb63bb76e7872234b9f76904164562f2.jpg?compress=1&resize=450x338&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/8800762/media/74bcb5791dd88b494ca1a4d1c989186d.jpg?compress=1&resize=450x338&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/9730006/media/591061328e52d8880b9dbcfad20a8c32.jpg?compress=1&resize=450x338&vertical=top',
  'https://cdn.dribbble.com/users/3281732/screenshots/6440552/862cbcef-4c1a-4a8a-b475-8eb138fa0f5f_4x.jpeg?compress=1&resize=450x338&vertical=top',
]

const imageW = WIDTH * 0.7
const imageH = imageW * 1.54

export const CarouselAnimation = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <View style={{ width: WIDTH, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: item }}
          style={{
            width: imageW,
            height: imageH,
            resizeMode: 'cover',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 20,
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          })

          return (
            <Animated.Image
              source={{ uri: image }}
              key={`image-${index}`}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={20}
            />
          )
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})
