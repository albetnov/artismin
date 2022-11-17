import { Button, Heading, Text } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import List from "../Components/Channels/List";
import Layout from "../Components/Layout";
import ChannelRepository from "../Repositories/ChannelRepository";

export default function Channels() {
  const [channels, setChannels] = useState<DocumentData[]>([]);

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
        <Button marginY={10}>Add Channel</Button>
        <hr />
        <List data={channels} />
      </Card>
    </Layout>
  );
}
