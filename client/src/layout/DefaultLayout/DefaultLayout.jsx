import React, { useState } from "react";
import "./DefaultLayout.css";
import HeaderOnLogin from "../../components/Header/HeaderOnLogin";
import CardImage from "../../components/CardImage/CardImage";

const DefaultLayout = ({ dataImage }) => {
  const [searchImage, setSearchImage] = useState("");
  const [asyncData, setAsyncData] = useState([]);
  const handleSearchImage = (keyword) => {
    setSearchImage(keyword);
  };
  return (
    <div className="wrap-default-layout">
      <HeaderOnLogin onSearchImage={handleSearchImage} />
      <CardImage dataImage={dataImage} searchByImage={searchImage} />
    </div>
  );
};

export default DefaultLayout;
