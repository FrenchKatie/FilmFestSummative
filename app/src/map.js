import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (

      <Map google={this.props.google}
      initialCenter={{
        lat: -41.286461,
        lng: 174.776230
      }}
      className={'map'}
      zoom={10}>
      <Marker
        title={'Embassy Deluxe'}
        name={'Embassy Deluxe'}
        position={{lat: -41.294320, lng: 174.784058}}
      />

      <Marker
        title={'Roxy Cinema'}
        name={'Roxy Cinema'}
        position={{lat: -41.315849, lng:  174.816254}}
      />

      <Marker
        title={'Penthouse Cinema'}
        name={'Penthouse Cinema'}
        position={{lat: -41.305859, lng:  174.763580}}
      />

      <Marker
        title={'Lighthouse Cinema Petone'}
        name={'Lighthouse Cinema Petone'}
        position={{lat: -41.226067, lng:  174.879562}}
      />

      <Marker
        title={'Reading Cinema'}
        name={'Reading Cinema'}
        position={{lat: -41.292824, lng:  174.779984}}
      />


      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q"
})(MapContainer)
