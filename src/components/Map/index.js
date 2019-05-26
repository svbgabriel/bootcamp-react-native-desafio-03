import React, { Component } from 'react';
import { View, Image } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';
import styles from './styles';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic3ZiZ2FicmllbCIsImEiOiJjanZoZDNieWEwMmVjNDludGQ0bHV0a2JvIn0.vjBzla2wYdpVjFHcw-vVKg',
);

class Map extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    users: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          bio: PropTypes.string,
          login: PropTypes.string,
          avatar: PropTypes.string,
          cordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
          }),
        }),
      ),
    }).isRequired,
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.geometry.coordinates;
    const { showModal } = this.props;

    await showModal({ latitude, longitude });
  };

  render() {
    const { users } = this.props;
    return (
      <MapboxGL.MapView
        centerCoordinate={[-49.6451598, -27.2177659]}
        style={styles.container}
        showUserLocation
        styleURL={MapboxGL.StyleURL.Light}
        onLongPress={this.handleMapClick}
      >
        {users.data.map(user => (
          <MapboxGL.PointAnnotation
            key={user.id}
            id={user.login}
            coordinate={[user.cordinates.longitude, user.cordinates.latitude]}
          >
            <View style={styles.annotationContainer}>
              <Image source={{ uri: user.avatar }} style={styles.annotationFill} />
            </View>
            <MapboxGL.Callout title={`${user.name} ${user.bio ? user.bio : ''}`} />
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
