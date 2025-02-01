import React from 'react';
import { Viewer, Entity, CameraFlyToBoundingSphere } from "resium";
import * as Cesium from 'cesium';
import { BoundingSphere, Cartesian3, HeadingPitchRange } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const MapViewer = ({ geoJsonData, activeFilters = [] }) => {
    return (
        <Viewer
            full
            animation={false}
            timeline={false}>
            <CameraFlyToBoundingSphere
                boundingSphere={new BoundingSphere(Cartesian3.fromDegrees(-73.561668, 45.508888, 400), 0)}
                offset={new HeadingPitchRange(0, ((-40*Math.PI) / 180.0), 60000)}
                duration={2} />

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
