import {
  Button,
  Checkbox,
  Combobox,
  Dialog,
  Pane,
  Table,
  Text,
  TextareaField,
  TextInputField,
} from "evergreen-ui";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import useAlert from "../../Hooks/useAlert";
import { useWebhookStore } from "../../Store/WebhookStore";
import { channelList, ChannelListInterface, sendEmbed } from "../../Utils/Api";
import safeRef from "../../Utils/SafeRef";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function SendEmbed() {
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
  const [color, setColor] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorNameRef = useRef<HTMLInputElement>(null);
  const authorUrlRef = useRef<HTMLInputElement>(null);
  const authorIconUrlRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);

  interface FieldsInterface {
    name: string;
    value: string;
    inline: boolean;
  }

  const [fields, setFields] = useState<FieldsInterface[]>([]);

  const changeFieldHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, event.target.value);
    setFields((prev) => {
      const data = [...prev];
      if (event.target.name === "name") {
        data[index]["name"] = event.target.value;
      } else if (event.target.name === "value") {
        data[index]["value"] = event.target.value;
      } else {
        data[index]["inline"] = event.target.checked;
      }
      return data;
    });
  };

  const addMoreField = () => {
    setFields((prev) => [...prev, { name: "", value: "", inline: false }]);
  };

  const removeField = (index: number) => {
    setFields((prev) => {
      const data = [...prev];
      data.splice(index, 1);
      return data;
    });
  };

  const colorsList = [
    "Default",
    "White",
    "Aqua",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "LuminousVividPink",
    "Fuchsia",
    "Gold",
    "Orange",
    "Red",
    "Grey",
    "Navy",
    "DarkAqua",
    "DarkGreen",
    "DarkBlue",
    "DarkPurple",
    "DarkVividPink",
    "DarkGold",
    "DarkOrange",
    "DarkRed",
    "DarkGrey",
    "DarkerGrey",
    "LightGrey",
    "DarkNavy",
    "Blurple",
    "Greyple",
    "DarkButNotBlack",
    "NotQuiteBlack",
  ];

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

      const title = safeRef(titleRef);
      const content = safeRef(contentRef);
      const authorName = safeRef(authorNameRef);
      const authorUrl = safeRef(authorUrlRef);
      const authorIcon = safeRef(authorIconUrlRef);
      const imageUrl = safeRef(imageUrlRef);
      const thumbnailUrl = safeRef(thumbnailUrlRef);

      const res = await sendEmbed(webhookUrl, {
        channel_id: channel,
        title,
        description: content,
        author: authorName
          ? {
              name: authorName,
              url: authorUrl,
              iconUrl: authorIcon,
            }
          : null,
        image: imageUrl,
        thumbnail: thumbnailUrl,
        fields,
        color,
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);
      setData(text);
      changeAlert("Success!", "success");
    } catch (err: any) {
      console.error(err);
      setData(err.message);
      changeAlert("failed.", "danger");
    } finally {
      setFields([]);
      setChannel("");
      setColor("");
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
            <TextInputField label="Title" hint="Your embed title" ref={titleRef} required />
            {formField}
            <TextareaField
              label="Content"
              hint="Content you want to deliver"
              ref={contentRef}
              required
            />
            <TextInputField
              label="Author Name"
              hint="Please input author name"
              required
              ref={authorNameRef}
              type="text"
            />
            <TextInputField
              label="Author URL"
              hint="Please input author link"
              required
              ref={authorUrlRef}
              type="text"
            />
            <TextInputField
              label="Author ICON URL"
              hint="Please input author icon link"
              required
              ref={authorIconUrlRef}
              type="text"
            />
            <TextInputField
              label="Image URL"
              hint="Please input image link"
              required
              ref={imageUrlRef}
              type="text"
            />
            <TextInputField
              label="Thumbnail URL"
              hint="Please input thumbnail link"
              required
              ref={thumbnailUrlRef}
              type="text"
            />
            {fields.length > 0 &&
              fields.map((item, i) => (
                <Pane display="flex" alignItems="center" key={i}>
                  <TextInputField
                    label="Field Title"
                    hint="Please input field title"
                    required
                    value={item.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeFieldHandler(i, e)}
                    name="name"
                  />
                  <TextInputField
                    label="Field Value"
                    hint="Please input field value"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeFieldHandler(i, e)}
                    value={item.value}
                    name="value"
                  />
                  <Checkbox
                    label="Inline?"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeFieldHandler(i, e)}
                    checked={item.inline}
                    name="inline"
                  />
                  <Button onClick={() => removeField(i)}>
                    <FiX />
                  </Button>
                </Pane>
              ))}
            <Button onClick={addMoreField} marginY={5}>
              Add Field
            </Button>
            <Combobox
              placeholder="Colors"
              onChange={(item) => setColor(item)}
              items={colorsList}
              openOnFocus
            />
          </>
        )}
      </Dialog>
      <Table.TextCell>/api/sendEmbed</Table.TextCell>
      <Table.TextCell>
        <Button isLoading={loading} onClick={() => setBody(true)}>
          Send Embed
        </Button>
      </Table.TextCell>
      <Table.Cell onClick={() => setModal(true)}>{element}</Table.Cell>
    </>
  );
}
