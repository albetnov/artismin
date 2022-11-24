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
      backgroundColor="#ffffff"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      marginX="auto"
      className="max-w-sm lg:max-w-none"
    >
      {children}
    </EverGreenCard>
  );
}
