import React from "react";
import banner from "../../asset/images/center-77497603.png";
import leftBanner from "../../asset/images/left-511a9304.png";
import rightBanner from "../../asset/images/right-88044782.png";
import topRightBanner from "../../asset/images/topRight-d0230035.png";
import "./Banner.css";
const Banner = () => {
  return (
    <div id="banner">
      <div id="left-banner">
        <img src={banner} alt="" id="img-main" />
        <img src={leftBanner} alt="" id="img-left" />
        <img src={rightBanner} alt="" id="img-right" />
        <img src={topRightBanner} alt="" id="img-topright" />
      </div>
      <div id="right-banner">
        <h1>Tìm kiếm ý tưởng</h1>
        <p>Bạn muốn thử điều gì tiếp theo?</p>
        <p>Hãy nghĩ về ý tưởng bạn yêu thích</p>
        <button>Khám phá</button>
      </div>
    </div>
  );
};

export default Banner;
