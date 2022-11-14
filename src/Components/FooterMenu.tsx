import { Pane, Text } from "evergreen-ui";
import React from "react";
import { Link } from "react-router-dom";

interface FooterMenuProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export default function FooterMenu({ icon, text, href }: FooterMenuProps) {
  return (
    <Link to={href} style={{ color: "black", textDecoration: "none" }}>
      <Pane
        textAlign="center"
        padding={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={10}
      >
        {icon}
        <Text size={600}>{text}</Text>
      </Pane>
    </Link>
  );
}
