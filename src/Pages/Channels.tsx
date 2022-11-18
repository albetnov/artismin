import { Button } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import Create from "../Components/Channels/Create";
import List from "../Components/Channels/List";
import CommonPageBase from "../Components/CommonPageBase";
import ChannelRepository from "../Repositories/ChannelRepository";

export default function Channels() {
  const [channels, setChannels] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchChannel = async () => {
    const channels = new ChannelRepository();
    setChannels(await channels.getChannel());
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <CommonPageBase heading="Manage Channels" description="Register channel to bot kernels.">
      <Button marginY={10} onClick={() => setShowCreate(true)}>
        Add Channel
      </Button>
      <Create show={showCreate} refetch={fetchChannel} setShow={setShowCreate} />
      <hr />
      <List data={channels} refetch={fetchChannel} />
    </CommonPageBase>
  );
}
