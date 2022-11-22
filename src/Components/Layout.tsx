import { Heading, ListItem, Pane, Text, UnorderedList } from "evergreen-ui";
import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Pane>
        <UnorderedList
          display="flex"
          flexDirection="row"
          gap={20}
          alignItems="center"
          listStyle="none"
          backgroundColor="#ffffff"
          padding={20}
          width="90%"
          marginX="auto"
          borderRadius={20}
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        >
          <ListItem>
            <Heading size={800}>Artismin</Heading>
          </ListItem>
          <ListItem>
            <Link to="/dashboard">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="/channels">Configure Channels</Link>
          </ListItem>
          <ListItem>
            <Link to="/roadmap">Manage Roadmap</Link>
          </ListItem>
          <ListItem>
            <Link to="/roles">Configure Roles</Link>
          </ListItem>
          <ListItem>
            <Link to="/rules">Manage Rules</Link>
          </ListItem>
          <ListItem>
            <Link to="/schedules">Configure Schedules</Link>
          </ListItem>
          <ListItem>
            <Link to="/webhook">Webhook</Link>
          </ListItem>
          <ListItem>
            <Link to="/logout">Logout</Link>
          </ListItem>
        </UnorderedList>
      </Pane>
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
          padding={15}
          borderRadius={15}
          marginX="auto"
          marginTop={10}
          textAlign="center"
          width="100%"
        >
          &copy; {new Date().getFullYear()} - Artismin by{" "}
          <a href="https://github.com/albetnov">Albet Novendo</a>
        </Pane>
      </Pane>
    </Container>
  );
}
