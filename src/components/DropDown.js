/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'

export default function DropDownList({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <DropDown
      activeColor={theme.colors.primary}

           
             {...props}
            />
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  
  },
  dropdown: {
    borderColor: theme.colors.primary,
    borderWidth:2,
    borderTopColor:theme.colors.primary
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
