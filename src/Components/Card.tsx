import { Card as EverGreenCard } from "evergreen-ui";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <EverGreenCard
      borderRadius={10}
      padding={20}
      marginTop={30}
      marginX="auto"
      className="max-w-sm lg:max-w-none bg-white shadow-lg dark:bg-zinc-600"
    >
      {children}
    </EverGreenCard>
  );
}
