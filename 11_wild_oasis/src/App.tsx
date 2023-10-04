import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row>
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Welcome</Heading>
              <Button onClick={() => alert("check in")}>Check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("check in")}
              >
                Check in
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Want to see more?</Heading>
            <form>
              <Input placeholder="number of guests" type="number" />
              <Input placeholder="number of guests" type="number" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
