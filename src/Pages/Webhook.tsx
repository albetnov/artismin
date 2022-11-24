import { Alert, Button, Code, Heading, Pane, Table, Text } from "evergreen-ui";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import BasicModal from "../Components/BasicModal";
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
  const { webhookUrl, changed, unregister } = useWebhookStore((state) => ({
    webhookUrl: state.webhookUrl,
    changed: state.changed,
    unregister: state.unregister,
  }));
  const [check, setCheck] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [learnMore, setLearnMore] = useState(false);

  useEffect(() => {
    console.log(webhookUrl);
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
  }, [webhookUrl, changed]);

  return (
    <Layout>
      <BasicModal
        isShown={learnMore}
        title="What is Webhook?"
        onCloseComplete={() => setLearnMore(false)}
      >
        <Text textAlign="center" size={600}>
          Webhook
        </Text>
        <hr />
        <Text textAlign="left" display="block">
          Webhook commonly know as after effect requests to certain endpoint. This should fulfill
          your coriousity about general{" "}
          <a className="underline text-sky-400" href="https://en.wikipedia.org/wiki/Webhook">
            Webhook
          </a>
          . Where as Artisan Bot used Webhook to trigger some events in the bot. Those events
          related to: Refreshing Cache, Sending Message, etc.
        </Text>
        <Text textAlign="left" marginTop={10} display="block">
          In order to use Webhook. You shall set <Code>&quot;ENABLE_WEBHOOK&quot;</Code> to{" "}
          <Code>true</Code> in your <Code>.env</Code> file and then restart the bot servers. When
          starting the bot, You should watch under Webhook URL logged in your console. Use the url
          and insert it in the following field. Once done, Artismin will automatically validate and
          remember it for you.
        </Text>
        <Text textAlign="left" marginTop={10} display="block">
          Under the hood, Artisan Bot provides this webhook as API powered by{" "}
          <a className="underline text-sky-400" href="https://www.fastify.io/">
            Fastify
          </a>
          . So you could also use Postman or other tools to trigger events in the bot.
        </Text>
      </BasicModal>
      <Card>
        <Heading>
          Webhook{" "}
          <Button appearance="minimal" onClick={() => setLearnMore(true)}>
            (learn more)
          </Button>
        </Heading>
        {loading ? (
          <Loading />
        ) : check !== null && !check ? (
          <NotConfigured />
        ) : (
          <>
            <Alert marginY={10}>Configured: {webhookUrl}. Health check passed</Alert>
            <Pane overflowX="auto">
              <Table className="w-[120%] md:w-auto">
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
            </Pane>
          </>
        )}
        {check && (
          <Button intent="danger" onClick={unregister}>
            <FiX /> Invalidate
          </Button>
        )}
      </Card>
    </Layout>
  );
}
