import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { globalStateContext } from "../App";
import { generateFullNickname } from "../common_functions/userFunctions";
// styles
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Grid, Cell } from "baseui/layout-grid";
import FileUpload from "./FileUpload";

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
      <Grid>
        <Cell span={10}>
          <Input
            placeholder="Enter message"
            required
            id="message"
            type="text"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          />
        </Cell>

        <Cell span={2}>
          <Button type="submit" value="Send">
            Send
          </Button>
        </Cell>
      </Grid>
      <FileUpload />
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
