import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import RootNavigator from './navigator/AppNavigator'
import User from './store/User'
import NoficationManager from './manager/NoficationManager'

const styles = StyleSheet.create({
  noInternetView: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  noInternetText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#333333',
    fontFamily: "GoogleSans-Regular",
  },
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInternetConnected: true,
    }
    NoficationManager.getDeviceTokenForFirebase()
    User.getUserFromStore()
  }

  componentWillMount() {
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this),
    )
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this),
    )
  }

  handleFirstConnectivityChange(reach) {
    if (reach.type === 'none' || reach.type === 'NONE') {
      this.setState({ isInternetConnected: false })
    } else {
      this.setState({ isInternetConnected: true })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator />
        {!this.state.isInternetConnected && <View style={styles.noInternetView}>
          <Text style={styles.noInternetText}>{'Tidak Ada Koneksi Internet, Silahkan Cek Koneksi Anda Sekarang.'}</Text>
        </View>}
      </View>
    )
  }
}


