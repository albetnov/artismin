import { Alert, Button, Checkbox, Dialog, Label, Table, Text } from "evergreen-ui";
import { useState } from "react";
import useAlert from "../../Hooks/useAlert";
import { useWebsocketStore } from "../../Store/WebsocketStore";
import { clearCache } from "../../Utils/wssApi";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function ClearCache() {
  const [loading, setLoading] = useState(false);
  const { changeAlert, resetAlert, element } = useAlert();
  const { wssUrl } = useWebsocketStore((state) => ({
    wssUrl: state.wssUrl,
  }));
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState(false);

  const [channels, setChannels] = useState(false);
  const [roles, setRoles] = useState(false);

  const fetchHandler = async () => {
    try {
      resetAlert();
      setLoading(true);
      if (!wssUrl) throw new Error();
      let res;
      if (!channels && !roles) {
        res = await clearCache(wssUrl);
      } else {
        res = await clearCache(wssUrl, {
          channels: channels,
          roles: roles,
        });
      }
      console.log(res);
      if (!res.ok) throw new Error();
      setData(await res.text());
      changeAlert("Success!", "success");
    } catch (err) {
      console.log(err);
      changeAlert("failed.", "danger");
    } finally {
      setLoading(false);
      setBody(false);
    }
  };

  return (
    <>
      <BasicModal isShown={modal} title="Detail Response" onCloseComplete={() => setModal(false)}>
        {data ? data : <Text>Please hit a request first.</Text>}
      </BasicModal>
      <Dialog
        isShown={body}
        title="Request Fields"
        onConfirm={fetchHandler}
        onCloseComplete={() => setBody(false)}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <Alert>
              Unchecking both simply clearing all. If you want to clear each of them. Check one of
              them then.
            </Alert>
            <Label>Clear channel only?</Label>
            <Checkbox
              onChange={() => setChannels((prev) => !prev)}
              checked={channels}
              disabled={roles}
            />
            <Label>Clear Roles only?</Label>
            <Checkbox
              onChange={() => setRoles((prev) => !prev)}
              checked={roles}
              disabled={channels}
            />
          </>
        )}
      </Dialog>
      <Table.TextCell>/api/refreshCache</Table.TextCell>
      <Table.TextCell>
        <Button isLoading={loading} onClick={() => setBody(true)}>
          Refresh Cache
        </Button>
      </Table.TextCell>
      <Table.Cell onClick={() => setModal(true)}>{element}</Table.Cell>
    </>
  );
}
