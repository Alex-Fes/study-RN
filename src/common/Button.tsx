import React from 'react'

import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

type Props = {
  title: string
  fontSize: number
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  color: string
  children?: React.ReactNode
} & TouchableOpacityProps

export const Button = ({ title, color, fontSize, fontWeight, children, ...restProps }: Props) => {
  return (
    <TouchableOpacity {...restProps}>
      <Text
        style={[
          styles.title,
          {
            fontSize,
            fontWeight,
            color,
          },
        ]}
      >
        {title}
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {},
  title: {
    textAlign: 'center',
    paddingVertical: 5,
  },
})
