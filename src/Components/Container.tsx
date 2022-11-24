import { Pane } from "evergreen-ui";

interface ContainerProps {
  children: React.ReactNode;
  padding?: number;
}

export default function Container({ children, padding }: ContainerProps) {
  return (
    <Pane
      padding={padding}
      backgroundColor="#F9FAFC"
      minHeight="100vh"
      marginX="auto"
      textAlign="center"
      maxWidth="full"
    >
      {children}
    </Pane>
  );
}
