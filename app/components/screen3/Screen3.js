import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";


import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import CurrentLocationButton from './CurrentLocationButton';

class Screen3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      cordLatitude:32.7333207,
      cordLongitude:-97.1155631,
      latitudeDelta:1,
      longitudeDelta:1,
      watchID : null,
      geoLoc : null,
    };

    this.mergeLot = this.mergeLot.bind(this);
    this.getLocationUpdate();

  }

  showLocation(position){
    this.setState({
      latitude : position.coords.longitude,
      longitude : position.coords.latitude,
    });
    console.log("aayush");
  }
  getLocationUpdate() {
    if(navigator.geolocation){
      var options = {timeout:600};
      geoLoc = navigator.geolocation;
      watchID = geoLoc.watchPosition(() => this.showLocation(), options);
      this.setState({
        watchId : watchID,
        geoLoc : geoLoc,
      });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );

   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, "32.7333207,-97.1155631");
       });
     }

   }

   async getDirections(startLoc, destinationLoc) {

         try {
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=walking&key=AIzaSyAuj8hqmhYH49aKGNWxIufzg3DgF0AZ5_g`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
             this.setState({x: "error"})
             return error
         }
     }


     centerMap() {
       const latitude = this.state.latitude;
       const longitude = this.state.longitude;
       const latitudeDelta = this.state.latitudeDelta;
       const longitudeDelta = this.state.longitudeDelta;
       this.map.animateToRegion({
         latitude,
         longitude,
         latitudeDelta,
         longitudeDelta
       })
     }

  render() {

    return (
      <View style = {styles.container}>
      <CurrentLocationButton cb = {() => {this.centerMap()}}/>
      <MapView style={styles.map} initialRegion={{
       latitude:32.7333207,
       longitude:-97.1155631,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}
      ref = {(map) => {this.map = map}}>

      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}

       {!!this.state.cordLatitude && !!this.state.cordLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
          title={"Your Destination"}
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.latitude, longitude: this.state.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    left : 100,
    right : 100,
    top : 100,
    bottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }
});

export default Screen3;
