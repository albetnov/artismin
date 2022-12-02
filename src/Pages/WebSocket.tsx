import { Alert, Button, Code, Heading, Pane, Table, Text } from "evergreen-ui";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import BasicModal from "../Components/BasicModal";
import Card from "../Components/Card";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import CastRules from "../Components/WebSocket/CastRules";
import ClearCache from "../Components/WebSocket/ClearCache";
import NotConfigured from "../Components/WebSocket/NotConfigured";
import SendEmbed from "../Components/WebSocket/SendEmbed";
import SendMessage from "../Components/WebSocket/SendMessage";
import { useWebsocketStore } from "../Store/WebsocketStore";
import { checkClient } from "../Utils/wssApi";

export default function WebSocket() {
  const { wssUrl, changed, unregister } = useWebsocketStore((state) => ({
    wssUrl: state.wssUrl,
    changed: state.changed,
    unregister: state.unregister,
  }));

  const [check, setCheck] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [learnMore, setLearnMore] = useState(false);

  useEffect(() => {
    console.log(wssUrl);
    const checkWebsocket = async () => {
      if (!wssUrl) {
        setCheck(false);
        return;
      }

      try {
        setLoading(true);
        const res = await checkClient(wssUrl);
        setCheck(res);
      } catch {
        setCheck(false);
      } finally {
        setLoading(false);
      }
    };
    checkWebsocket();
  }, [wssUrl, changed]);

  return (
    <Layout>
      <BasicModal
        isShown={learnMore}
        title="What is WebSocket?"
        onCloseComplete={() => setLearnMore(false)}
      >
        <Text textAlign="center" size={600}>
          WebSocket
        </Text>
        <hr />
        <Text textAlign="left" display="block">
          Commonly knows as a realtime two way binding communication of both client and server. More
          details can be found in this article:{" "}
          <a className="underline text-sky-400" href="https://javascript.info/websocket">
            WebSocket
          </a>
          . Artisan make good use of WebSocket to achieve two way of communication for both this
          panel and the bot. Until now. It&lsquo;s hard for us to perform some action and changes to
          the bot directly via this panel until <Link to="/webhook">Webhook</Link>. But, it comes
          with a price. Your hosting provider. Shall support boths hosting bot and a server.
        </Text>
        <Text textAlign="left" display="block" marginTop={5}>
          Therefore, WebSocket comes into aid. WebSocket allows you to split the backend, bot, and
          the panel. But Please Note. If your hosting provider support hosting both backend and bot.
          Please consider to use WebHook. As WebSocket is pretty costly (Live Connection).
        </Text>
        <Text textAlign="left" marginTop={10} display="block">
          In order to use WebSocket. You shall set <Code>&quot;ENABLE_WEBSOCKET&quot;</Code> to{" "}
          <Code>true</Code>, <Code>WEBSOCKET_LIVE_URL</Code> to your WebSocket address, finally{" "}
          <Code>WEBSOCKET_TOKEN</Code> to your unencrypted token in your <Code>.env</Code> file and
          then restart the bot servers. Use the same websocket url you configured in{" "}
          <Code>.env</Code> before and insert it in the following field. Once done, Artismin will
          automatically validate and remember it for you.
        </Text>
        <Text textAlign="left" marginTop={10} display="block">
          Under the hood, Artisan Bot provides this WebSocket as API powered by{" "}
          <a
            className="underline text-sky-400"
            href="https://unetworking.github.io/uWebSockets.js/generated/index.html"
          >
            uWebSocket.js
          </a>{" "}
          Combined with{" "}
          <a className="underline text-sky-400" href="https://socket.io">
            SocketIO
          </a>
          . These allows you to directly use Postman or other tools to emit events in the bot. As
          they were exposed.
        </Text>
      </BasicModal>
      <Card>
        <Heading>
          WebSocket
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
            <Alert marginY={10}>Configured: {wssUrl}. Health check passed</Alert>
            <Pane overflowX="auto">
              <Table className="w-[120%] md:w-auto">
                <Table.Head>
                  <Table.TextHeaderCell>Route</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Response</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <ClearCache />
                  </Table.Row>
                  <Table.Row>
                    <SendMessage />
                  </Table.Row>
                  <Table.Row>
                    <SendEmbed />
                  </Table.Row>
                  <Table.Row>
                    <CastRules />
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
