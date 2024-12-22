import React from "react";
import ReactStars from "react-stars";

const ReviewCard = ({ star, review, name = "unknown" }) => {
  return (
    <div className="review-wrapper">
      <h5>{name}</h5>
      <ReactStars
        count={5}
        size={24}
        value={star}
        color2={"#ffd700"}
        edit={false}
      />
      <h6>{review}</h6>
    </div>
  );
};

export default ReviewCard;
