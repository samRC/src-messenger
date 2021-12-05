import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { Cell, Grid } from "baseui/layout-grid";

export default function SignUp({ setNickname }) {
  const signUpNickname = (e) => {
    e.preventDefault();
    const nickname = document.getElementById("nickname").value;
    window.localStorage.setItem("nickname", nickname);
    setNickname(nickname);
  };

  return (
    <form onSubmit={signUpNickname}>
      <Grid>
        <Cell span={8}>
          <Input
            placeholder="Enter a nickname"
            required
            id="nickname"
            type="text"
          />
        </Cell>
        <Cell span={4}>
          <Button type="submit" value="Sign Up">
            Sign Up
          </Button>
        </Cell>
      </Grid>
    </form>
  );
}
