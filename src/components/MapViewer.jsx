import React from 'react';
import { Viewer, Entity } from "resium";
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const MapViewer = ({ geoJsonData, activeFilters = [] }) => {
  return (
    <Viewer>
      {geoJsonData && geoJsonData.features &&
      geoJsonData.features.filter(feature => 
        activeFilters.length === 0 || activeFilters.includes(feature.properties.TYPE)
      ).map((feature, index) => {
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
};

export default MapViewer;
