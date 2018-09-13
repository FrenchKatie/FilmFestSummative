import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: -41.286461,
      lng: 174.776230
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly

      <div className="rot">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCRGARfY6fdwr7kKjIqKaksMKOnelBx46Q'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={-41.286461}
            lng={174.776230}
            text={'Wellington'}
          />
        </GoogleMapReact>
      </div>
      // </div>
    );
  }
}

export default SimpleMap;
