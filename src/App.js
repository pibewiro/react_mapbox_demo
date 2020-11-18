import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as ParkData from "./data.json";
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100%",
    height: "100%",
    zoom: 10,
  });

  const [selectedPark, setSelectedPark] = useState(null);
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {ParkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <div
              className="marker-btn"
              onMouseEnter={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                var x = e.clientX,
                  y = e.clientY;
                let elementMouseIsOver = document.elementFromPoint(x, y);
                console.dir(elementMouseIsOver);
                if (elementMouseIsOver.className !== "overlays") {
                  setSelectedPark(null);
                }
              }}
            >
              <img src="/skateboarding.svg" alt="skate" />
            </div>
            <div class="hoverDiv">
              <p>skate</p>
            </div>
          </Marker>
        ))}
        {selectedPark ? (
          <div
            id="hoverDiv"
            onMouseLeave={(e) => {
              e.preventDefault();
              var x = e.clientX,
                y = e.clientY;
              let elementMouseIsOver = document.elementFromPoint(x, y);
              console.dir(elementMouseIsOver);
              if (elementMouseIsOver.className !== "overlays") {
                setSelectedPark(null);
              }
            }}
          >
            <Popup
              latitude={selectedPark.geometry.coordinates[1]}
              longitude={selectedPark.geometry.coordinates[0]}
              onClose={() => setSelectedPark(null)}
              id="hoverDiv"
            >
              <div>{selectedPark.properties.NAME}</div>
            </Popup>
          </div>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
