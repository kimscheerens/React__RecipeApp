import React from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  return (
    <div className="google-map">
      <GoogleMapReact
         bootstrapURLKeys={{ key: "AIzaSyCIouNks6hMSdQM6V_AtH3ile-BbdZuD44" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,         
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length &&
          places.map((place, i) => (
            <div
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              <div>
                <div variant="subtitle2" gutterBottom>
                  {place.name}
                </div>
                <img       
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
              </div>
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
