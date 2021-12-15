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
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { Grid, Cell } from "baseui/layout-grid";
import { ChevronRight } from "baseui/icon";
import FileUpload from "./FileUpload";

export default function NewMessage() {
  const { user, nickname } = useContext(globalStateContext);
  const [message, setMessage] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    // const message = document.getElementById("message").value;
    await saveMessageToDatabase(message, nickname, user);
    setMessage("");
    document.getElementById("latest-message").scrollIntoView();
  };

  const sendMessageOnEnter = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      await sendMessage(e);
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <Grid>
        <Cell span={[2, 6, 8]}>
          <Textarea
            placeholder="Message"
            required
            id="message"
            type="text"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            overrides={{
              Input: {
                style: {
                  height: "3em",
                },
              },
            }}
            onKeyDown={sendMessageOnEnter}
          />
        </Cell>

        <Cell span={[1, 1, 2]}>
          <Button id="send-message-button" type="submit" value="Send">
            <ChevronRight />
          </Button>
        </Cell>
        <Cell span={[1, 1, 2]}>
          <FileUpload />
        </Cell>
      </Grid>
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
