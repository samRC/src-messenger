import { Paragraph2 } from "baseui/typography";
import { Card } from "baseui/card";
import { useContext } from "react";
import { globalStateContext } from "../App";

export default function Message({ message }) {
  // console.log(message);
  const { user } = useContext(globalStateContext);

  return (
    message && (
      <Card
        overrides={{
          Root: {
            style: {
              padding: "1px",
              width: "100%",
              marginBottom: "10px",
              backgroundColor:
                user.uid.localeCompare(message.userId) === 0
                  ? "#EBECF0"
                  : "#FFF",
              wordWrap: "break-word",
            },
          },
        }}
      >
        <Paragraph2>
          <span style={{ fontSize: ".8em" }}>
            {message.timestamp
              ? new Date(message.timestamp.seconds * 1000)
                  .toString()
                  .substr(4, 17) /*(16,5) for time only*/
              : new Date().toString()}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>
            <span>{message.nickname}: </span>
          </strong>
          &nbsp;
          {message.message}
        </Paragraph2>
        {message.imageUrl && (
          <div style={{ textAlign: "center" }}>
            <img
              style={{ maxHeight: "150px" }}
              alt="uploaded"
              src={message.imageUrl}
            />
          </div>
        )}
      </Card>
    )
  );
}
