import React, { useState, useEffect } from 'react';
import { Viewer, Entity } from "resium";
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

function App() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch('/data/STM_Montreal_Public_Places.geojson')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  return (
    <Viewer full>
      {geoJsonData && geoJsonData.features.map((feature, index) => {
        const coordinates = feature.geometry.coordinates;
        return (
          <Entity
            key={index}
            name={feature.properties.DESCRIPTION}
            position={Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], coordinates[2])}
            point={{
              pixelSize: 10,
              color: Cesium.Color.ORANGE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 1
            }}
          />
        );
      })}
    </Viewer>
  );
}

export default App;
