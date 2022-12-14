import { Heading, Pane } from "evergreen-ui";
import CrashLog from "../Components/Dashboard/CrashLog";
import QuestionAnswer from "../Components/Dashboard/QuestionAnswer";
import Welcome from "../Components/Dashboard/Welcome";
import Layout from "../Components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <Heading className="dark:text-white" size={800} paddingTop={20}>
        Dashboard
      </Heading>
      <Pane paddingX={10}>
        <Welcome />
        <CrashLog />
        <QuestionAnswer />
      </Pane>
    </Layout>
  );
}
