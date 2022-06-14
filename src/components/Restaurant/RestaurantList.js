import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "./PlaceDetails";

const RestaurantList = ({ places, type, setType, childClicked }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <>
      <div className="form-group">
        <select className="restaurant__select_box" id="type" value={type} onChange={e => setType(e.target.value)}>
          <option className="select_box__text" value="restaurants">
            Restaurants
          </option>
          <option className="select_box__text" value="hotels">
            Hotels
          </option>
        </select>
      </div>
      <div>
        {places?.map((place, i) => (
          <div ref={elRefs[i]} key={i}>
            <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
          </div>
        ))}
      </div>
    </>
  );
};
export default RestaurantList;
