import React from 'react';
import { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import stationsData from './assets/stations.json';

function App() {

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  useEffect(() =>{
      (async () =>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('No permission to get location')
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      })();
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <MapView
          style={{ width: '100%', height: '100%' }} 
          region={region}>
          {stationsData.features.map((station) => (
            <Marker
              key={station.properties.ID}
              coordinate={{
              latitude: station.properties.y,
              longitude: station.properties.x,
            }}
            title={station.properties.Nimi}
            description={station.properties.Osoite}

            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = {
  container: {
    alignItems: 'center',
  },
};

export default App;