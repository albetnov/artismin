import { Button, Heading, Text } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Create from "../Components/Channels/Create";
import List from "../Components/Channels/List";
import Layout from "../Components/Layout";
import ChannelRepository from "../Repositories/ChannelRepository";

export default function Channels() {
  const [channels, setChannels] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = new ChannelRepository();
      setChannels(await channels.getChannel());
    };
    fetchChannel();
  }, []);

  return (
    <Layout>
      <Card>
        <Heading size={600}>Manage Channels</Heading>
        <Text>Register Channel to bot kernels.</Text> <br />
        <Button marginY={10} onClick={() => setShowCreate(true)}>
          Add Channel
        </Button>
        <Create show={showCreate} setShow={setShowCreate} />
        <hr />
        <List data={channels} />
      </Card>
    </Layout>
  );
}
