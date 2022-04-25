import React from "react";

const Jweets = ({ jweet, isOwner }) => {
  return (
    <div>
      <h4>{jweet.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Jweets;
