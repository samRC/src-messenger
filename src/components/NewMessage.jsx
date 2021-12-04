import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { globalStateContext } from "../App";
import { generateFullNickname } from "../common_functions/userFunctions";

export default function NewMessage() {
  const { user, nickname } = useContext(globalStateContext);
  const [message, setMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    // const message = document.getElementById("message").value;
    await saveMessageToDatabase(message, nickname, user);
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        placeholder="Enter message"
        required
        id="message"
        type="text"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
      />
      <input type="submit" value="Send" />
    </form>
  );
}

async function saveMessageToDatabase(message, nickname, user) {
  try {
    await addDoc(collection(getFirestore(), "messages"), {
      nickname: generateFullNickname(user, nickname),
      userId: user.uid,
      message,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.log("Error writing to DB", e);
  }
}
