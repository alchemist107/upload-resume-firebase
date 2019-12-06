import React from "react";
import axios from "axios";
import "./uploader.css";

let uploadURL = "http://localhost:3000/upload";

function sendFile(file) {
  const formData = new FormData();
  formData.append("fileUpload", file);

  axios
    .post(uploadURL, formData)
    .then(data => console.log("upload success"))
    .catch(err => console.log(err));
}

export default function Uploader() {
  function fileHandler(e) {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    sendFile(file);
  }

  let test = new FormData();
  return (
    <div className="box-upload">
      <span> Upload Your Resume </span>
      <input
        className="add-btn"
        type="file"
        name="myFile"
        onChange={fileHandler}
      />
    </div>
  );
}
