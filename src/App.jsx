import React, { useState, useEffect } from 'react';
import { Viewer, Entity } from "resium";
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import MapViewer from './components/MapViewer';
import FilterView from './components/FilterView';

function App() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetch('/data/STM_Montreal_Public_Places.geojson')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  const handleFilterChange = (type) => {
    const newFilters = activeFilters.includes(type)
      ? activeFilters.filter(t => t !== type)
      : [...activeFilters, type];
    setActiveFilters(newFilters);
  };

  const types = geoJsonData ? [...new Set(geoJsonData.features.map(item => item.properties.TYPE))] : [];

  return (
    <div className="container">
      <div className="filter-view">
        <FilterView types={types} onFilterChange={handleFilterChange} activeFilters={activeFilters} />
      </div>
      <div className="map-view">
        <MapViewer geoJsonData={geoJsonData} activeFilters={activeFilters} />
      </div>
    </div>
  );
}

export default App;
