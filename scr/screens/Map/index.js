import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, SafeAreaView, Modal, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import { Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Callout } from 'react-native-maps';
import { onChange } from 'react-native-reanimated';

export default class App extends Component {
  constructor() {
    super();
    this.state = { lat: 0.0, log: 0.0, latdelta: '', region: '', showmodal1: false, description: "" }
  }


  componentDidMount() {

    this.getshow()
  }

  getshow = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position....", position);
        // alert(JSON.stringify(position))
        this.setState({
          lat: position.coords.latitude, log: position.coords.longitude
        })

        // let show = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.0043,
        //   longitudeDelta: 0.0034
        // }
        // this.setState({ show });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  textChange = (text) => {
    this.setState({ showmodal1: true })
  }

  render() {
    console.log(this.state.description);
    return (
      <View style={s.MainContainer}>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={s.mapStyle}
          showsUserLocation={true}
          // zoomEnabled={true}
          // zoomControlEnabled={true}
          region={{
            latitude: this.state.lat,
            longitude: this.state.log,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          }}
          // onRegionChange={(region) => this.setState({ lat: region.latitude, log: region.longitude })}
          // onRegionChangeComplete={(region) => this.setState({ lat: region.latitude, log: region.longitude })}
          initialRegion={this.state.show}
        >
          <Marker
            coordinate={{ latitude: this.state.lat, longitude: this.state.log }}>
            <Callout style={{ height: hp('10%'), width: wp('15%') }}>
              <ScrollView>
                <Image style={{ height: hp('8%'), width: wp('15%'), backgroundColor: "white" }} resizeMode='contain' source={require('../../assets/image/world.png')}></Image>
                <Text style={{ fontSize: hp('1.9%'), color: '#30BE76', fontFamily: 'Nunito-Regular', }}>{this.state.description}</Text>
              </ScrollView>
            </Callout>
          </Marker>

        </MapView>
        <SafeAreaView>
          <View style={[s.buttonContainer, { height: this.state.showmodal1 == true ? hp('35%') : hp('5%') }]}>
            <View style={[s.TOsearch, { flexDirection: "row" }]}>
              <Image style={s.search} source={require('../../assets/image/search.png')}></Image>
            </View>
            <GooglePlacesAutocomplete
              styles={{
                textInput: {
                  height: hp('4.9%'),
                  color: '#5d5d5d',
                  fontSize: 16,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 10
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              placeholder='Search recipe,people,or tags'
              fetchDetails={true}
              textInputProps={
                {
                  onChange: this.textChange.bind(this),
                }
              }
              onPress={(data, details = null) => {
                this.setState({ lat: '', log: '' })
                console.log('++', data, details);
                // alert(JSON.stringify(details.geometry.location.lng))
                this.setState({ description: data.description, lat: details.geometry.location.lat, log: details.geometry.location.lng })
                this.setState({ showmodal1: false })
              }}

              query={{
                key: 'AIzaSyBvJ2uJB3RyDXePGC8h5h-EoPgYiijKjTw',
                language: 'en',
              }}
            />
          </View>
        </SafeAreaView>
      </View >

    );
  }
}

const s = StyleSheet.create({
  MainContainer: {
    flex: 1, color: 'red'
  },
  mapStyle: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    shadowColor: 'silver',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 5,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: wp('90%'),
    elevation: 5, alignSelf: "center", position: 'relative'

  },
  TOsearch: {
    backgroundColor: 'white',
    height: hp('4.9%'),
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  textinputstyle: {
    // backgroundColor: "white",
    height: hp('5%'),
    marginLeft: wp('2%'),
    width: wp('68%'), padding: 0, margin: 0, alignSelf: "center"
  },
  search: {
    // backgroundColor: 'white',
    height: hp('3%'),
    width: wp('6%'),
  }
});  