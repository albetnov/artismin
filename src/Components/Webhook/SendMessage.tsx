import { Button, Combobox, Dialog, Table, Text, TextareaField, TextInputField } from "evergreen-ui";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import useAlert from "../../Hooks/useAlert";
import { useWebhookStore } from "../../Store/WebhookStore";
import { channelList, ChannelListInterface, sendMessage } from "../../Utils/Api";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function SendMessage() {
  const [loading, setLoading] = useState(false);
  const { changeAlert, resetAlert, element } = useAlert();
  const { webhookUrl } = useWebhookStore((state) => ({
    webhookUrl: state.webhookUrl,
  }));
  const [data, setData] = useState("");
  const [modal, setModal] = useState(false);
  const [body, setBody] = useState(false);
  const [list, setList] = useState<ChannelListInterface[] | false>(false);

  const [channel, setChannel] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchChannelList = async () => {
      if (webhookUrl) {
        const res = await channelList(webhookUrl);
        if (res.ok) {
          const json = await res.json();
          setList(json);
        }
      }
    };

    fetchChannelList();
  }, [webhookUrl]);

  const fetchHandler = async () => {
    try {
      resetAlert();
      setLoading(true);
      if (!webhookUrl) throw new Error();

      const content = contentRef.current?.value;

      const res = await sendMessage(webhookUrl, {
        channel_id: channel,
        message: content,
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);
      setData(text);
      changeAlert("Success!", "success");
    } catch (err: any) {
      setData(err.message);
      changeAlert("failed.", "danger");
    } finally {
      setChannel("");
      setLoading(false);
      setBody(false);
    }
  };

  const formField = list ? (
    <Combobox
      placeholder="Channel ID"
      onChange={(item) => {
        const choice = list.filter((entry) => entry.name.toLowerCase() === item.toLowerCase())[0];
        setChannel(choice.id);
      }}
      items={list.map((item) => item.name)}
      openOnFocus
    />
  ) : (
    <TextInputField
      label="Channel ID"
      hint="Please input channel ID you want to sent this message to."
      value={channel}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setChannel(e.target.value)}
      required
      type="text"
    />
  );

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
            {formField}
            <TextareaField
              label="Message"
              hint="Message you want to deliver"
              ref={contentRef}
              required
            />
          </>
        )}
      </Dialog>
      <Table.TextCell>/api/sendMessage</Table.TextCell>
      <Table.TextCell>
        <Button isLoading={loading} onClick={() => setBody(true)}>
          Send A Message
        </Button>
      </Table.TextCell>
      <Table.Cell onClick={() => setModal(true)}>{element}</Table.Cell>
    </>
  );
}
