import React from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Jweets = ({ jweet, isOwner }) => {
  const onClickDelete = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    console.log(ok);
    const jweetTextRef = doc(dbService, "Jweets", `${jweet.id}`);
    if (ok) {
      await deleteDoc(jweetTextRef);
    } else {
      //noDelete
    }
  };
  return (
    <div>
      <h4>{jweet.text}</h4>
      {isOwner && (
        <>
          <button onClick={onClickDelete}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Jweets;
