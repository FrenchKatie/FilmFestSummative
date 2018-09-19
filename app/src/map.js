import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

    state = {
     activeMarker: {},
     selectedPlace: {},
     showingInfoWindow: false
   };

   onMarkerClick = (props, marker) =>
     this.setState({
       activeMarker: marker,
       selectedPlace: props,
       showingInfoWindow: true
     });

   onInfoWindowClose = () =>
     this.setState({
       activeMarker: null,
       showingInfoWindow: false
     });

   onMapClicked = () => {
     if (this.state.showingInfoWindow)
       this.setState({
         activeMarker: null,
         showingInfoWindow: false
       });
   };


  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (

      <Map google={this.props.google}
      initialCenter={{
        lat: -41.286461,
        lng: 174.776230
      }}
      onClick={this.onMapClicked}
      className={'map'}
      zoom={12}>

      <Marker
        title={'Embassy Deluxe'}
        name={'Embassy Deluxe'}
        onClick={this.onMarkerClick}
        position={{lat: -41.294320, lng: 174.784058}}
      />

      <Marker
        title={'Roxy Cinema'}
        name={'Roxy Cinema'}
        onClick={this.onMarkerClick}
        position={{lat: -41.315849, lng:  174.816254}}
      />

      <Marker
        title={'Penthouse Cinema'}
        name={'Penthouse Cinema'}
        onClick={this.onMarkerClick}
        position={{lat: -41.305859, lng:  174.763580}}
      />

      <Marker
        title={'Lighthouse Cinema Petone'}
        name={'Lighthouse Cinema Petone'}
        onClick={this.onMarkerClick}
        position={{lat: -41.226067, lng:  174.879562}}
      />

      <Marker
        title={'Reading Cinema'}
        name={'Reading Cinema'}
        onClick={this.onMarkerClick}
        position={{lat: -41.292824, lng:  174.779984}}
      />

      <InfoWindow
         marker={this.state.activeMarker}
         onClose={this.onInfoWindowClose}
         visible={this.state.showingInfoWindow}>
         <div>
           <h5>{this.state.selectedPlace.name}</h5>
         </div>
       </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q"
})(MapContainer)
