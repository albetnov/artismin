import { Alert, Heading, Table } from "evergreen-ui";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import CheckHealth from "../Components/Webhook/CheckHealth";
import ClearCache from "../Components/Webhook/ClearCache";
import NotConfigured from "../Components/Webhook/NotConfigured";
import Ping from "../Components/Webhook/Ping";
import SendEmbed from "../Components/Webhook/SendEmbed";
import SendMessage from "../Components/Webhook/SendMessage";
import { useWebhookStore } from "../Store/WebhookStore";
import { checkForHealth } from "../Utils/Api";

export default function Webhook() {
  const { webhookUrl } = useWebhookStore((state) => ({ webhookUrl: state.webhookUrl }));
  const [check, setCheck] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWebhook = async () => {
      if (!webhookUrl) {
        setCheck(false);
        return;
      }

      try {
        setLoading(true);
        const res = await checkForHealth(webhookUrl);
        setCheck(res.ok);
      } catch {
        setCheck(false);
      } finally {
        setLoading(false);
      }
    };
    checkWebhook();
  }, [webhookUrl]);

  return (
    <Layout>
      <Card>
        <Heading>Webhook (learn more)</Heading>
        {loading ? (
          <Loading />
        ) : check !== null && !check ? (
          <NotConfigured />
        ) : (
          <>
            <Alert marginY={10}>Configured: {webhookUrl}. Health check passed</Alert>
            <Table>
              <Table.Head>
                <Table.TextHeaderCell>Route</Table.TextHeaderCell>
                <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                <Table.TextHeaderCell>Response</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <CheckHealth />
                </Table.Row>
                <Table.Row>
                  <Ping />
                </Table.Row>
                <Table.Row>
                  <ClearCache />
                </Table.Row>
                <Table.Row>
                  <SendMessage />
                </Table.Row>
                <Table.Row>
                  <SendEmbed />
                </Table.Row>
              </Table.Body>
            </Table>
          </>
        )}
      </Card>
    </Layout>
  );
}
