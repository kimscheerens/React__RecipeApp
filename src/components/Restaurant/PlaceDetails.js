import React from "react";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="PlaceDetailCard">
      <div
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <div>
        <h5 className="PlaceDetailCard__title">{place.name}</h5>
        <div display="flex" justifyContent="space-between">
          <div>Prijs</div>
          <div>{place.price_level}</div>
        </div>
        <div display="flex" justifyContent="space-between">
          <div component="legend">Ranking</div>
          <div gutterBottom variant="subtitle1">
            {place.ranking}
          </div>
        </div>
        {place?.cuisine?.map(({ name }) => (
          <div key={name} size="small" label={name} />
        ))}
        {place.address && (
          <div gutterBottom variant="body2" color="textSecondary">
            {place.address}
          </div>
        )}
        {place.phone && (
          <div variant="body2" color="textSecondary">
            {place.phone}
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
