import React, { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { getPlacesData } from "../../utils/api";

import RestaurantList from "./RestaurantList";
import Map from "./Map";

const Restaurant = () => {
  const [type, setType] = useState("restaurants");

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds) {
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
      });
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <div className="restaurant">
      <h2 className="restaurant__title">Don't want to cook?</h2>
      <div className="restaurant__container">
        {/* <Autocomplete onPlaceChanged={onPlaceChanged}> */}
        <RestaurantList childClicked={childClicked} places={filteredPlaces.length ? filteredPlaces : places} type={type} setType={setType} className="restaurant__List" />
        <Map setChildClicked={setChildClicked} setBounds={setBounds} setCoords={setCoords} coords={coords} places={filteredPlaces.length ? filteredPlaces : places} className="map-container" />
        {/* </Autocomplete> */}
      </div>
    </div>
  );
};

export default Restaurant;
