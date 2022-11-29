import { Alert, Heading, Switch, Table, Text } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import SettingsRepository from "../Repositories/SettingsRepository";
import useSettingsStore from "../Store/SettingStore";

export default function Settings() {
  const [settings, setSettings] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setChanged } = useSettingsStore((state) => ({ setChanged: state.setChanged }));

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
    await new SettingsRepository().editSetting(id, e.target.checked);
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
        {isLoading && (
          <Alert>
            <Loading />
          </Alert>
        )}
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Action</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {settings.map((item) => (
              <Table.Row key={item.id}>
                <Table.TextCell>{item.title}</Table.TextCell>
                <Table.Cell>
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
      </Card>
    </Layout>
  );
}
