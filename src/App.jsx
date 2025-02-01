import React, { useState, useEffect } from 'react';
import { Viewer, GeoJsonDataSource, Entity} from "resium";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css'; 

function App() {

  const [geoJsonDataSource, setGeoJsonDataSource] = useState(null);

  useEffect(() => {
    const loadGeoJson = async () => {
 
      console.log("Loading GeoJSON from:", '../data/STM_Montreal_Public_Places.geojson');
      const data = await Cesium.GeoJsonDataSource.load('/data/STM_Montreal_Public_Places.geojson', {
        markerColor: Cesium.Color.ORANGE,
        markerSize: 10,
      });

      data.entities.values.forEach(entity => {
        entity.point = new Cesium.PointGraphics({
          color: Cesium.Color.ORANGE,
          pixelSize: 10,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 1
        });
      });
      setGeoJsonDataSource(data);
    
    
    };

    loadGeoJson();

  }, []);

  return (
    <>
      <Viewer full >
      {geoJsonDataSource && <GeoJsonDataSource dataSource={geoJsonDataSource} />}
      </Viewer>
    </>
  )
}

export default App
