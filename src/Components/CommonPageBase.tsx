import { Heading, Text } from "evergreen-ui";
import Card from "./Card";
import Layout from "./Layout";

interface CommonPageBaseProps {
  heading: string;
  description: string;
  children: React.ReactNode;
}

export default function CommonPageBase({ heading, description, children }: CommonPageBaseProps) {
  return (
    <Layout>
      <Card>
        <Heading size={600} className="dark:text-white">
          {heading}
        </Heading>
        <Text className="dark:text-white">{description}</Text> <br />
        {children}
      </Card>
    </Layout>
  );
}
