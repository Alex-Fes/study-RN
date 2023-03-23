import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import { Main } from './src/screens/Main'

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/*<Text>Open up App.tsx to start working on your app!</Text>*/}
        <Main />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
