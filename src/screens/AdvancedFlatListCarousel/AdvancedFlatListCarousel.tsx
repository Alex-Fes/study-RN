import React, { useRef } from 'react'

import {
  Animated,
  Dimensions,
  Image,
  ListRenderItem,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const bgs: string[] = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']
const DATA: DataType[] = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description: "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: 'https://cdn-icons-png.flaticon.com/512/10128/10128907.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description: 'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://cdn-icons-png.flaticon.com/512/10128/10128898.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://cdn-icons-png.flaticon.com/512/10128/10128900.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://cdn-icons-png.flaticon.com/512/10128/10128890.png',
  },
]
const Indicator = ({ scrollX }: any) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {DATA.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [{ scale }],
            }}
            key={`indicator-${index}`}
          />
        )
      })}
    </View>
  )
}

const Backdrop = ({ scrollX }: any) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  })

  return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
}

const Square = ({ scrollX }: any) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  )
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  })

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }],
      }}
    />
  )
}

export const AdvancedFlatListCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current

  const renderItem: ListRenderItem<DataType> = ({ item }) => {
    return (
      <View style={{ width, alignItems: 'center', padding: 20 }}>
        <View style={{ flex: 0.7, justifyContent: 'center' }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: width / 2, height: height / 2, resizeMode: 'contain' }}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 28, marginBottom: 10 }}>
            {item.title}
          </Text>
          <Text style={{ color: '#fff', fontWeight: '300' }}>{item.description}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal={true}
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={renderItem}
      />
      <Indicator scrollX={scrollX} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type DataType = {
  key: string
  title: string
  description: string
  image: string
}
