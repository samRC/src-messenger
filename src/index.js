import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider, styled } from "baseui";
import { Card } from "baseui/card";
const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  margin: "20px",
});

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Card
            overrides={{
              Root: {
                style: { backgroundColor: "#FAFAFA", maxWidth: "600px" },
              },
            }}
          >
            <App />
          </Card>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
