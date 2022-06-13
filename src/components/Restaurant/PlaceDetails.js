import React from "react";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="PlaceDetailCard">
      <img
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
        className="PlaceDetailCard__img"
      />
      <div>
        <h5 className="PlaceDetailCard__title">{place.name}</h5>
        <div className="PlaceDetailCard__info">
          <div>Prijs</div>
          <div>{place.price_level}</div>
        </div>
        <div >
          <div component="legend" className="PlaceDetailCard__info">Ranking</div>
          <div gutterBottom variant="subtitle1">
            {place.ranking}
          </div>
        </div>
        <div className="PlaceDetailCard__info">
        {place?.cuisine?.map(({ name }) => (
          <div key={name} label={name} />
        ))}
        {place.address && (
          <div gutterBottom variant="body2" className="PlaceDetailCard__adress">
            {place.address}
          </div>
        )}</div>
        {place.phone && (
          <div variant="body2" >
          ☎️ {place.phone}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => window.open(place.website, "_blank")}>
          Website
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
