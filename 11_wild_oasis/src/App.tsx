import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

// TODO: FIX: background color
const StyledApp = styled.div`
  background-color: #ddd;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Input placeholder="number of guests" type="number" />
        <Button onClick={() => alert("check in")}>Check in</Button>
      </StyledApp>
    </>
  );
}

export default App;
