import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google}
      center={{
        lat: -41.286461,
        lng: 174.776230
      }}
      className={'map'}
      zoom={10}>

        <Marker
          title={'Embassy Deluxe'}
          name={"Embassy Deluxe"}
          position={{lat: -41.294320, lng: 174.784058}} />

        <Marker
          title={'Roxy Cinema'}
          name={"Roxy Cinema"}
          position={{lat: -41.315849, lng: 174.816254}} />

        <Marker
          title={'Penthouse Cinema'}
          name={"Penthouse Cinema"}
          position={{lat: -41.315850, lng: 174.816259}} />

        <Marker
          title={'Nga Taonga Sound & Vision'}
          name={"Nga Taonga Sound & Vision"}
          position={{lat: -41.294013, lng: 174.777949}} />

        <Marker
          title={'Light House Petone'}
          name={"Light House Petone"}
          position={{lat: -41.226068, lng: 174.879564}} />

        <Marker
          title={'Reading Cinema'}
          name={"Reading Cinema"}
          position={{lat: -41.292823, lng: 174.779986}} />
        <Marker />

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q"
})(MapContainer)
