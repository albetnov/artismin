import { Alert, Heading, Pane, Switch, Table, Text } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import useAlert from "../Hooks/useAlert";
import SettingsRepository from "../Repositories/SettingsRepository";
import useSettingsStore from "../Store/SettingStore";
import { useWebhookStore } from "../Store/WebhookStore";
import { useWebsocketStore } from "../Store/WebsocketStore";

export default function Settings() {
  const [settings, setSettings] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setChanged } = useSettingsStore((state) => ({ setChanged: state.setChanged }));
  const { webhookUrl, checkWHCloud } = useWebhookStore((state) => ({
    webhookUrl: state.webhookUrl,
    checkWHCloud: state.checkCloud,
  }));
  const { wssUrl, checkWSCloud } = useWebsocketStore((state) => ({
    wssUrl: state.wssUrl,
    checkWSCloud: state.checkCloud,
  }));
  const { element, changeAlert, resetAlert } = useAlert();

  const fetchSettings = async () => {
    setIsLoading(true);
    const data = await new SettingsRepository().getSettings();
    setIsLoading(false);
    setSettings(data);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const changeValue = async (id: string, e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    resetAlert();
    if (id === "saves_url_webhook") {
      if (!webhookUrl) {
        changeAlert("Ups, Webhook URL not found.", "danger");
        return;
      }
      await new SettingsRepository().editSaves(id, webhookUrl, e.target.checked);
      checkWHCloud();
    } else if (id === "saves_url_websocket") {
      if (!wssUrl) {
        changeAlert("Ups, Websocket URL not found.", "danger");
        return;
      }
      await new SettingsRepository().editSaves(id, wssUrl, e.target.checked);
      checkWSCloud();
    } else if (id === "enable_welcome") {
      const checked = e.target.checked;
      await new SettingsRepository().editSetting(id, checked);
      if (!checked) {
        await new SettingsRepository().editSetting("enable_rules", checked);
      }
    } else {
      await new SettingsRepository().editSetting(id, e.target.checked);
    }
    setIsLoading(false);
    setChanged(true);
    fetchSettings();
  };

  return (
    <Layout>
      <Card>
        <Heading>Settings</Heading>
        <Text>Adjust settings to your need</Text>
        <hr />
        {element}
        {isLoading && (
          <Alert>
            <Loading />
          </Alert>
        )}
        <Alert intent="warning" marginY={10}>
          Some action may take a while to finally apply to bot.
        </Alert>
        <Pane>
          <Table>
            <Table.Head className="w-full lg:w-[500px]">
              <Table.TextHeaderCell>Name</Table.TextHeaderCell>
              <Table.TextHeaderCell>Action</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body className="w-full lg:w-[500px]">
              {settings.map((item) => (
                <Table.Row key={item.id}>
                  <Table.TextCell width="fit-content">{item.title}</Table.TextCell>
                  <Table.Cell display="flex" justifyContent="center">
                    <Switch
                      disabled={isLoading}
                      checked={item.value}
                      onChange={(e) => changeValue(item.id, e)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Pane>
      </Card>
    </Layout>
  );
}
