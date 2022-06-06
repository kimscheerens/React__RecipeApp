import React, { useState } from "react";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const imageListRef = ref(storage, "Images/");

const ImagesUpload = ({ setImageUrl }) => {
  const [imageUpload, setImageUpload] = useState([]);

  const uploadImage = () => {
    if (imageUpload == null) return;
    console.log(imageUpload);

    const imageRef = ref(
      storage,
      `Images/${v4()}_${imageUpload.imageUrl.name}`
    );
    uploadBytes(imageRef, imageUpload.imageUrl).then((snapshot) => {
      // alert("image uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        console.log(url);
      });
    });
  };

  return (
    /**[0] is because we only will upload 1 picture */
    <div>
      <input
        type="file"
        className="form-group__input-img"
        onChange={(e) => setImageUpload({ imageUrl: e.target.files[0] })}
      ></input>
      <button onClick={uploadImage}>upload image</button>
    </div>
  );
};

export default ImagesUpload;
