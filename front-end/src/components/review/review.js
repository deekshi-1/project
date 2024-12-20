import React from "react";
import ReactStars from "react-stars";

const ReviewCard = (data) => {
  return (
    <div className="review-wrapper">
      <h5>Name</h5>
      <ReactStars
        count={5}
        size={24}
        value={4}
        color2={"#ffd700"}
        edit={false}
      />
      <h6>ajhdkajfsajhfakhdlashjdlasdh</h6>
    </div>
  );
};

export default ReviewCard;
