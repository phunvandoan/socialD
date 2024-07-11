import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import Wrapper from "../../components/wrapper/Wrapper";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Button } from "@mui/material";
import "./map.css";

const Map = () => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl,
      iconUrl: iconUrl,
      shadowUrl: shadowUrl,
    });

    const map = L.map("map").setView([21.00321, 105.84774], 11);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let waypoints = [];
    let markers = [];
    let routingControl = null;
    map.on("click", (e) => {
      if (waypoints.length === 2) return;
      const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      markers.push(marker);
      waypoints.push(L.latLng(e.latlng.lat, e.latlng.lng));

      if (waypoints.length === 2) {
        routingControl = L.Routing.control({
          waypoints: waypoints,
        }).addTo(map);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "q") {
        waypoints = [];
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
        markers = [];

        if (routingControl) {
          map.removeControl(routingControl);
          routingControl = null;
        }
      }
    });

    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e) => {
        if (waypoints.length === 2) return;

        const marker = L.marker(e.geocode.center).addTo(map);
        markers.push(marker);
        waypoints.push(e.geocode.center);

        if (waypoints.length === 2) {
          if (routingControl) {
            map.removeControl(routingControl);
          }

          routingControl = L.Routing.control({
            waypoints: waypoints,
          }).addTo(map);
        }
      })
      .addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  const pressEsc = () => {
    const event = new KeyboardEvent("keydown", { key: "q" });
    document.dispatchEvent(event);
  };

  const handleScrollToggle = () => {
    if (isScrolledToBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    pressEsc();
    setIsScrolledToBottom(!isScrolledToBottom);
  };

  return (
    <Wrapper>
      <div id="map">
        <button className="buttonReset" onClick={pressEsc}>
          X
        </button>
        <button className="buttonView" onClick={handleScrollToggle}>
          {isScrolledToBottom ? "^" : "v"}
        </button>
      </div>
    </Wrapper>
  );
};

export default Map;
