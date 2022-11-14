import { Pane, Text } from "evergreen-ui";
import React from "react";
import { MdHome } from "react-icons/md";
import Container from "./Container";
import FooterMenu from "./FooterMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Pane
        display="flex"
        minHeight="100vh"
        justifyContent="space-between"
        flexDirection="column"
        width="full"
      >
        {children}
        <Pane
          backgroundColor="#F4F5F9"
          padding={20}
          borderRadius={15}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          marginBottom={20}
          marginX="auto"
          display="flex"
          flexDirection="row"
          gap={30}
          justifyContent="space-between"
          width="90%"
        >
          <FooterMenu icon={<MdHome fontSize={30} />} text="Home" href="/dashboard" />
          <FooterMenu icon={<MdHome fontSize={30} />} text="Home" href="/dashboard" />
          <FooterMenu icon={<MdHome fontSize={30} />} text="Home" href="/dashboard" />
        </Pane>
      </Pane>
    </Container>
  );
}
