import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Tile from './components/Button'
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component {
  state = {
    fontloaded: false,
    activeTile: 0,
    simonPlay: false,
    computerArray: [],
    userArray: []
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunito': require('./assets/fonts/Nunito-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  _startGame = () => {
    this.setState({activeTile: 0, userArray: [], computerArray: []})
    this._startTurn()
  }

  _startTurn = () => {
    let newOne = Math.floor(Math.random() * 4 + 1)
    let computerArray = [...this.state.computerArray]
    this._playSound(newOne)
    computerArray.push(newOne)
    this.setState({activeTile: newOne, computerArray: computerArray})
    setTimeout(() => {this.setState({activeTile: 0})}, 500)
  }

  _playSound = (number) => {
    // let sounds = [
    //   {id: 1, file: require('./assets/sounds/1.wav')}, 
    //   {id: 2, file: require('./assets/sounds/2.wav')}, 
    //   {id: 3, file: require('./assets/sounds/3.wav')},
    //   {id: 4, file: require('./assets/sounds/4.wav')}
    // ]
    let sound = require('./assets/sounds/1.wav')
    sound.play()
  }

render() {
    const tiles = [
    {
      id: 1,
      color: '#98DBC6',
      hoverColor: '#79af9e',
      content: '🌈',
    },
    {
      id: 2,
      color: '#F18D9E',
      hoverColor: '#c0707e',
      content: '✨',
    },
    {
      id: 3,
      color: '#E6D72A',
      hoverColor: '#b8ac21',
      content: '🦄',
    },
    {
      id: 4,
      color: '#5BC8AC',
      hoverColor: '#48a089',
      content: '🌸',
    }
  ]

  let renderContentWhenFontLoads = this.state.fontLoaded ? (
      <LinearGradient colors={['#434343', '#000000']} style={styles.whole}>
        <Text style={styles.title}>🍰 Simon Time!! 🍓</Text>
        <View style={styles.container}>
          {tiles.map(tile => {
              return <Tile 
                color={tile.color} 
                content={tile.content} 
                hoverColor={tile.hoverColor}
                active={tile.id === this.state.activeTile}
              />
            }
          )}
        </View>
        <TouchableOpacity onPress={this._startTurn} style={styles.startButton}>
          <Text style={styles.buttonText}>Click to Start</Text>
        </TouchableOpacity>
      </LinearGradient>
    ) : <View></View>

    return renderContentWhenFontLoads
  }
}


const styles = StyleSheet.create({
  whole: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexWrap: 'wrap',
    backgroundColor: 'transparent'
  },
  title: {
    marginBottom: 30,
    fontSize: 32,
    fontFamily: 'nunito',
    color: 'white'
  },
  startButton: {
    backgroundColor: "#d84315",
    width: 260,
    marginTop: 30,
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});
