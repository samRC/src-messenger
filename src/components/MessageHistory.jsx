import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import Message from "./Message";
import { Spinner } from "baseui/spinner";

export default function MessageHistory() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const recentMessages = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "desc"),
      limit(7)
    );
    const unsubscribe = onSnapshot(recentMessages, function (snapshot) {
      // console.log(snapshot.docs);
      const msgs = [];
      snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        msgs.push(doc.data());
      });
      setMessages(msgs.reverse());
    });

    return () => unsubscribe();
  }, []);
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "20px",
        overflowY: "auto",
        overflowX: "hidden",
        height: "50vh",
      }}
    >
      {messages.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <Spinner size={96} />
        </div>
      )}
      {messages.length > 0 &&
        messages.map((m) => {
          return <Message key={m.timestamp} message={m} />;
        })}
      <div id="latest-message"></div>
    </div>
  );
}
