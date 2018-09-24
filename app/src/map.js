import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './css/index.css';
export class MapContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
     activeMarker: {},
     selectedPlace: {},
     showingInfoWindow: false
   };
   // this.seeCinema = this.seeCinema.bind(this);
   this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
  }


   onMarkerClick = (props, marker) => {
     this.setState({
       activeMarker: marker,
       selectedPlace: props,
       showingInfoWindow: true
     });
     // onInfoWindowClick();
   };

   onInfoWindowClose = () =>
     this.setState({
       activeMarker: null,
       showingInfoWindow: false
     });

     onInfoWindowClick = () => {
       if (this.state.showingInfoWindow){
       }
     };


   onMapClicked = () => {
     if (this.state.showingInfoWindow)
       this.setState({
         activeMarker: null,
         showingInfoWindow: false
       });
   };
  //this function passes through thed clicked cinema id through to the getCinemaNumber function
  seeCinema = (cinemaID) => {
    this.props.getCinemaNumber(cinemaID);
  }


  onInfoWindowOpen(props, e) {
    const button = (<button onClick={this.seeCinema.bind(this, this.state.selectedPlace.id)} id={this.state.selectedPlace.id}>View more information</button>);
    ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
  }


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
        title={'Lighthouse Cinema Petone'}
        name={'Lighthouse Cinema Petone'}
        id={0}
        onClick={this.onMarkerClick}
        position={{lat: -41.226067, lng:  174.879562}}
      />

      <Marker
        title={'Penthouse Cinema'}
        name={'Penthouse Cinema'}
        id={1}
        onClick={this.onMarkerClick}
        position={{lat: -41.305859, lng:  174.763580}}
      />

      <Marker
        title={'Reading Cinema'}
        name={'Reading Cinema'}
        id={2}
        onClick={this.onMarkerClick}
        position={{lat: -41.292824, lng:  174.779984}}
      />

      <Marker
        title={'Embassy Deluxe'}
        name={'Embassy Deluxe'}
        id={3}
        onClick={this.onMarkerClick}
        position={{lat: -41.294320, lng: 174.784058}}
      />

      <InfoWindow
         marker={this.state.activeMarker}
         onClose={this.onInfoWindowClose}
         visible={this.state.showingInfoWindow}
         onOpen={e => {
            this.onInfoWindowOpen(this.props, e);
          }}
         >



         <div>
           <h5>{this.state.selectedPlace.name}</h5>
           <h5>{this.state.selectedPlace.id}</h5>
           <div id="iwc" />
         </div>
       </InfoWindow>

      </Map>

    );
  }


}




export default GoogleApiWrapper({
  apiKey: "AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q"
})(MapContainer)
