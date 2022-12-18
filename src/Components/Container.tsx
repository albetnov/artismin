import { Pane } from "evergreen-ui";

interface ContainerProps {
  children: React.ReactNode;
  padding?: number;
}

export default function Container({ children, padding }: ContainerProps) {
  return (
    <Pane
      padding={padding}
      minHeight="100vh"
      marginX="auto"
      textAlign="center"
      maxWidth="full"
      className="bg-slate-100 dark:bg-zinc-800"
    >
      {children}
    </Pane>
  );
}
