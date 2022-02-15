/* eslint-disable prettier/prettier */
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source = { require('../assets/Engage_SubmarkSQ.png') }
    style = { styles.image }
    />
}

const styles = StyleSheet.create({
    image: {
        width: 230,
        height: 230,
        marginBottom: 8,
    },
})