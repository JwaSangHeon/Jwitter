import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Jweets from "components/Jweets";
import { ref, uploadString } from "@firebase/storage";
import { storageService } from "../fbase";
const Home = ({ userObj }) => {
  // console.log(userObj);
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);
  const [image, setImage] = useState();

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
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, image, "data_url");
    console.log(response);
    // await addDoc(collection(dbService, "Jweets"), {
    //   text: jweet,
    //   createAt: serverTimestamp(),
    //   createId: userObj.uid,
    // });
    // setJweet("");
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const [thefile] = files;
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImage(result);
    };
    reader.readAsDataURL(thefile);
  };

  const onClearImage = () => {
    setImage(null);
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
        <input type="file" accept="images/*" onChange={onFileChange} />
        <input type="submit" value="올리기" />
        {image && (
          <div style={{ width: 200 }}>
            <img style={{ width: "100%" }} src={image} alt="noImage" />
            <button onClick={onClearImage}>clear Image</button>
          </div>
        )}
      </form>
      <div>
        {jweets.map((jweet) => (
          <Jweets
            key={jweet.id}
            jweet={jweet}
            isOwner={jweet.createId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
