import {
  Button,
  Heading,
  ListItem,
  Menu,
  Pane,
  Popover,
  Position,
  UnorderedList,
} from "evergreen-ui";
import React from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiHome,
  FiLogOut,
  FiMenu,
  FiServer,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Container from "./Container";

interface LayoutProps {
  children: React.ReactNode;
}

const links = [
  {
    icon: FiHome,
    route: "/dashboard",
    name: "Home",
  },
  {
    icon: FiServer,
    route: "/channels",
    name: "Configure Channels",
  },
  {
    icon: FiActivity,
    route: "/roadmap",
    name: "Manage Roadmap",
  },
  {
    icon: FiUserCheck,
    route: "/roles",
    name: "Configure Roles",
  },
  {
    icon: FiCheckCircle,
    route: "/rules",
    name: "Manage Rules",
  },
  {
    icon: FiCalendar,
    route: "/schedules",
    name: "Manage Schedules",
  },
  {
    icon: FiGlobe,
    route: "/webhook",
    name: "Webhook",
  },
  {
    icon: FiLogOut,
    route: "/logout",
    name: "Logout",
  },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Pane>
        <UnorderedList
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
          className="hidden md:flex"
        >
          <ListItem>
            <Heading size={800}>Artismin</Heading>
          </ListItem>
          {links.map((item, i) => (
            <ListItem key={i} display="flex" marginX="auto" alignItems="center" gap={3}>
              <item.icon />
              <Link to={item.route}>{item.name}</Link>
            </ListItem>
          ))}
        </UnorderedList>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group>
                {links.map((item, i) => (
                  <Menu.Item key={i} icon={item.icon}>
                    <Link to={item.route}>{item.name}</Link>
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          }
        >
          <Button className="md:hidden absolute left-0 top-0" marginRight={16}>
            <FiMenu />
          </Button>
        </Popover>
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
