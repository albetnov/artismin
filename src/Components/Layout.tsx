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
import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiHome,
  FiLogOut,
  FiMenu,
  FiServer,
  FiSettings,
  FiToggleLeft,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import SettingsRepository from "../Repositories/SettingsRepository";
import useSettingsStore from "../Store/SettingStore";
import showRouteParser from "../Utils/showRouteParser";
import Container from "./Container";
import Loading from "./Loading";

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
    icon: FiToggleLeft,
    route: "/websocket",
    name: "Websocket",
  },
  {
    icon: FiSettings,
    route: "/settings",
    name: "Settings",
  },
  {
    icon: FiLogOut,
    route: "/logout",
    name: "Logout",
  },
];

export default function Layout({ children }: LayoutProps) {
  const { changed, setChanged } = useSettingsStore((state) => ({
    changed: state.isChanged,
    setChanged: state.setChanged,
  }));

  const [linksList, setLinksList] = useState<typeof links>([]);

  const fetchSettings = async () => {
    const data = await new SettingsRepository().getSettings();
    console.log(data);
    const result = showRouteParser(data);
    setLinksList(links.filter((item) => (item.route in result ? result[item.route] : true)));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (changed) {
      fetchSettings();
      setChanged(false);
    }
  }, [changed]);

  return (
    <Container>
      <Pane>
        <UnorderedList
          flexDirection="row"
          gap={20}
          alignItems="center"
          listStyle="none"
          padding={20}
          width="90%"
          marginX="auto"
          borderRadius={20}
          boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
          className="bg-white dark:bg-zinc-600 hidden md:flex"
        >
          <ListItem>
            <Heading size={800} className="dark:text-white">
              Artismin
            </Heading>
          </ListItem>
          {linksList.length <= 0 ? (
            <Loading />
          ) : (
            linksList.map((item, i) => (
              <ListItem key={i} display="flex" marginX="auto" alignItems="center" gap={3}>
                <item.icon className="dark:text-white" />
                <Link
                  to={item.route}
                  className="dark:text-white transition-all delay-200 hover:underline"
                >
                  {item.name}
                </Link>
              </ListItem>
            ))
          )}
        </UnorderedList>
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Group>
                {linksList.length <= 0 ? (
                  <Loading />
                ) : (
                  linksList.map((item, i) => (
                    <Menu.Item key={i} icon={item.icon}>
                      <Link to={item.route}>{item.name}</Link>
                    </Menu.Item>
                  ))
                )}
              </Menu.Group>
            </Menu>
          }
        >
          <Button className="block md:hidden absolute left-0 top-0" marginRight={16}>
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
          padding={15}
          borderRadius={15}
          marginX="auto"
          marginTop={10}
          textAlign="center"
          width="100%"
          className="bg-white dark:bg-zinc-700 dark:text-white"
        >
          &copy; {new Date().getFullYear()} - Artismin by{" "}
          <a href="https://github.com/albetnov">Albet Novendo</a>
        </Pane>
      </Pane>
    </Container>
  );
}
