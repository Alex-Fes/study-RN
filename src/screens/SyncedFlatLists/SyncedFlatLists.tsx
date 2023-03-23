import React, { useEffect, useRef, useState } from 'react'

import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { HEIGHT, SMALL_IMAGE_SIZE, SPACING, WIDTH } from '../../constants/constants'

import { API_IMAGES } from './api/Api'
import { RootObject } from './types'

export const SyncedFlatLists = () => {
  const [images, setImages] = useState<RootObject[] | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      const images = await API_IMAGES.getImages()

      return images.data.photos
    }

    fetchImages()
      .then(res => {
        setImages(res)
        // console.log(JSON.stringify(res, null, 2))
      })
      .catch(err => Alert.alert(err))
  }, [])

  const topRef = useRef<FlatList<RootObject> | null>()
  const thumbRef = useRef<FlatList<RootObject> | null>()
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * WIDTH,
      animated: true,
    })
    if (index * (SMALL_IMAGE_SIZE + SPACING) - SMALL_IMAGE_SIZE / 2 > WIDTH / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (SMALL_IMAGE_SIZE + SPACING) - WIDTH / 2 + SMALL_IMAGE_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  }

  if (!images) {
    return <Text>Loading...</Text>
  }

  const renderItem: ListRenderItem<RootObject> = ({ item }) => {
    return (
      <View style={styles.backgroundImg}>
        <Image source={{ uri: item.src.portrait }} style={[StyleSheet.absoluteFillObject]} />
      </View>
    )
  }
  const renderSmallItem: ListRenderItem<RootObject> = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
        <Image
          source={{ uri: item.src.portrait }}
          style={[
            styles.smallImage,
            { borderColor: activeIndex === index ? '#fff' : 'transparent' },
          ]}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref => (topRef.current = ref)}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={event =>
          scrollToActiveIndex(Math.floor(event.nativeEvent.contentOffset.x / WIDTH))
        }
      />
      <FlatList
        ref={ref => (thumbRef.current = ref)}
        data={images}
        renderItem={renderSmallItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        // pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.smallImgBox}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    width: WIDTH,
    height: HEIGHT,
  },
  smallImgBox: {
    position: 'absolute',
    bottom: SMALL_IMAGE_SIZE,
  },
  smallImage: {
    height: SMALL_IMAGE_SIZE,
    width: SMALL_IMAGE_SIZE,
    borderRadius: 12,
    marginRight: SPACING,
    borderWidth: 2,
  },
})
