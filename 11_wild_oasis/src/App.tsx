import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

// TODO: FIX: background color
const StyledApp = styled.div`
  background-color: #ddd;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Welcome</Heading>
        <Heading as="h3">Want to see more?</Heading>
        <Input placeholder="number of guests" type="number" />
        <Button onClick={() => alert("check in")}>Check in</Button>
      </StyledApp>
    </>
  );
}

export default App;
