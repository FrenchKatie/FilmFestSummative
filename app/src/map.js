import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './index.css';
export class MapContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
     activeMarker: {},
     selectedPlace: {},
     showingInfoWindow: false
   };
   // this.showAlert = this.showAlert.bind(this);
  }


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

   // showAlert() {
   //   alert("Im an alert");
   // }




  render() {
    var clickedMarker = document.getElementsByClassName('markerClick');
    console.dir(clickedMarker);

    // var clickedInfobox = document.getElementsByClassName('markerClick')["0"].parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.dir(clickedInfobox);

    // document.getElementsByClassName("markerClick").addEventListener("click", function(){
        // document.getElementById("demo").innerHTML = "Hello World";
        // console.log("button clicked");
    // });

    // function test(){
    //   console.log("test click");
    // }
    // function handleClick(e) {
    //   e.preventDefault();
    //   alert('The link was clicked.');
    // }





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
         visible={this.state.showingInfoWindow}>
         <div>
           <h5>{this.state.selectedPlace.name}</h5>
           <h5>{this.state.selectedPlace.id}</h5>

           <button className="markerClick" id={this.state.selectedPlace.id} onClick={this.showAlert}>Click for more information</button>
         </div>
       </InfoWindow>

      </Map>
    );
  }
}




export default GoogleApiWrapper({
  apiKey: "AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q"
})(MapContainer)
