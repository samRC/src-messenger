export default function Message({ message }) {
  // console.log(message);
  return (
    message && (
      <div>
        <p>
          <strong>{message.nickname}: </strong> {message.message} [
          {message.timestamp
            ? new Date(message.timestamp.seconds * 1000).toString()
            : new Date().toString()}
          ]
        </p>
      </div>
    )
  );
}
