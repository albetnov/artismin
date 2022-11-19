import { Button, Heading, Pane, Text } from "evergreen-ui";
import { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import Card from "../Card";

interface QuestionProps {
  title: string;
  children: React.ReactNode;
}

export default function Question({ title, children }: QuestionProps) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Pane display="flex" alignItems="center" flexDirection="column">
      <Pane display="flex" alignItems="center">
        <Heading>{title}</Heading>
        <Button
          padding={3}
          width="fit-content"
          marginLeft={10}
          borderRadius="100%"
          onClick={() => setCollapse((prev) => !prev)}
        >
          {collapse ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
        </Button>
      </Pane>
      {collapse && (
        <Card>
          <Text>{children}</Text>
        </Card>
      )}
    </Pane>
  );
}
