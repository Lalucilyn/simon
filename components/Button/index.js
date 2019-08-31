import React from 'react'
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native'

const Button = ({id, color, content, hoverColor, active}) => {
  let dynamicColor = active ? hoverColor : color
  return (<TouchableHighlight style={[styles.button, {backgroundColor: dynamicColor}]}>
  			<Text style={styles.emoji}>{content}</Text>          
          </TouchableHighlight>
         )
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    height: 120,
    width: 120
  },
  emoji: {
  	fontSize: 44
  }
})

export default Button