import { Heading, Pane } from "evergreen-ui";
import Container from "../Components/Container";
import CrashLog from "../Components/Dashboard/CrashLog";
import Welcome from "../Components/Dashboard/Welcome";

export default function Dashboard() {
  return (
    <Container>
      <Heading size="800" paddingTop={20}>
        Dashboard
      </Heading>
      <Pane paddingX={10}>
        <Welcome />
        <CrashLog />
      </Pane>
    </Container>
  );
}
