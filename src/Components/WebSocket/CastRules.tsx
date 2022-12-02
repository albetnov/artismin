import { Button, Table, Text } from "evergreen-ui";
import { useState } from "react";
import useAlert from "../../Hooks/useAlert";
import { useWebsocketStore } from "../../Store/WebsocketStore";
import { castRules } from "../../Utils/wssApi";
import BasicModal from "../BasicModal";

export default function CastRules() {
  const [loading, setLoading] = useState(false);
  const { changeAlert, resetAlert, element } = useAlert();
  const { wssUrl } = useWebsocketStore((state) => ({
    wssUrl: state.wssUrl,
  }));
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);

  const fetchHandler = async () => {
    try {
      resetAlert();
      setLoading(true);
      if (!wssUrl) throw new Error();
      const res = await castRules(wssUrl);
      if (!res.ok) throw new Error();
      setData(await res.text());
      changeAlert("Success!", "success");
    } catch {
      changeAlert("cast rules failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BasicModal isShown={modal} title="Detail Response" onCloseComplete={() => setModal(false)}>
        {data ? data : <Text>Please hit a request first.</Text>}
      </BasicModal>
      <Table.TextCell>/castRules</Table.TextCell>
      <Table.TextCell>
        <Button isLoading={loading} onClick={fetchHandler}>
          Cast Rules
        </Button>
      </Table.TextCell>
      <Table.Cell onClick={() => setModal(true)}>{element}</Table.Cell>
    </>
  );
}
