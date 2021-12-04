import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function MessageHistory() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const recentMessages = query(
      collection(getFirestore(), "messages"),
      orderBy("timestamp", "asc"),
      limit(7)
    );
    const unsubscribe = onSnapshot(recentMessages, function (snapshot) {
      // console.log(snapshot.docs);
      const msgs = [];
      snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>
      {messages.length > 0 &&
        messages.map((m) => {
          return <div key={m.timestamp}>{m.message}</div>;
        })}
    </div>
  );
}
