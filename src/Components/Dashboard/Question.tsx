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
        <Heading className="dark:text-white">{title}</Heading>
        <Button
          padding={3}
          width="fit-content"
          marginLeft={10}
          borderRadius="100%"
          onClick={() => setCollapse((prev) => !prev)}
          className="dark:bg-zinc-700 dark:shadow-lg dark:border-none dark:text-white"
        >
          {collapse ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
        </Button>
      </Pane>
      {collapse && (
        <Card>
          <Text className="dark:text-white">{children}</Text>
        </Card>
      )}
    </Pane>
  );
}
