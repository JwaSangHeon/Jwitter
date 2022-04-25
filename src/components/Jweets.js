import React, { useState } from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Jweets = ({ jweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweet.text);
  console.log(jweet.text);
  const onClickDelete = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    console.log(ok);
    const jweetTextRef = doc(dbService, "Jweets", `${jweet.id}`);
    if (ok) {
      await deleteDoc(jweetTextRef);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const jweetTextRef = doc(dbService, "Jweets", `${jweet.id}`);
    await updateDoc(jweetTextRef, {
      text: newJweet,
    });
    setEditing(false);
  };
  const onClickEdit = async () => {
    setEditing((prev) => !prev);
  };
  const onClickCancel = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정사항을 적어주세요"
              value={newJweet}
              onChange={onChange}
              required
            />{" "}
            <input type="submit" value="수정하기" />
          </form>
          <button onClick={onClickCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{jweet.text}</h4>
          {isOwner && (
            <>
              <button onClick={onClickDelete}>Delete</button>
              <button onClick={onClickEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Jweets;
