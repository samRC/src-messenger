export default function SignUp({ setNickname }) {
  const signUpNickname = (e) => {
    e.preventDefault();
    const nickname = document.getElementById("nickname").value;
    window.localStorage.setItem("nickname", nickname);
    setNickname(nickname);
  };

  return (
    <form onSubmit={signUpNickname}>
      <label htmlFor="nickname">Enter a nickname: </label>
      <input required id="nickname" type="text" />
      <input type="submit" value="Sign Up" />
    </form>
  );
}
