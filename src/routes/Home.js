import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
const Home = ({ userObj }) => {
  console.log(userObj);
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, "Jweets"));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(tweetArr);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "Jweets"), {
      text: jweet,
      createAt: serverTimestamp(),
      createId: userObj.uid,
    });
    setJweet("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={jweet}
          placeholder="오늘 어떠신가요?"
          maxLength="120"
          onChange={onChange}
        />
        <input type="submit" value="올리기" />
      </form>
      <div>
        {jweets.map((jweet) => (
          <div key={jweet.id}>
            <h4>{jweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
