import {
  Alert,
  Checkbox,
  Combobox,
  Dialog,
  Label,
  Pane,
  TextareaField,
  TextInputField,
} from "evergreen-ui";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useRef, useState, useEffect } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import ScheduleRepository from "../../Repositories/ScheduleRepository";
import { EditProps } from "../../Utils/EditProps";
import Loading from "../Loading";

export default function Edit({ show, setShow, refetch, item }: EditProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState<DocumentData[]>([]);
  const [channel, setChannel] = useState("");
  const [useSame, setUseSame] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await new ChannelRepository().getChannel();
      setChannels(channels);
    };

    fetchChannel();
    if (!item) return;
    setChannel(item.channel_id);
  }, []);

  const editScheduleHandler = async () => {
    if (loading || !item) return;

    setAlert(false);
    const titleInput = titleRef.current!.value;
    const descInput = descRef.current!.value;
    const imageInput = imageRef.current!.value;
    const dateInput = dateRef.current!.value;
    const timeInput = timeRef.current!.value;

    if (!channel || !titleInput || !descInput || !imageInput || !dateInput || !timeInput) {
      setAlert("Invalid inputs");
      return;
    }

    const executeWhen = Timestamp.fromDate(new Date(`${dateInput} ${timeInput}`));

    setLoading(true);
    await new ScheduleRepository().editSchedule(
      item.id,
      channel,
      descInput,
      executeWhen,
      imageInput,
      titleInput
    );
    await refetch();
    setLoading(false);

    setShow(false);
  };

  const parseDate = () => {
    if (!item) return;
    const date = item.execute_when.split(" ");
    const time = parseTime();
    date.length = date.length - 1;
    const newDate = new Date(`${date} ${time}`).toISOString().split("T")[0];

    return newDate;
  };

  const parseTime = () => {
    if (!item) return;
    const date = item.execute_when.split(" ");
    const time = date[date.length - 1];
    const newTime = time.split(".").join(":");

    return newTime;
  };

  return (
    <Dialog
      isShown={show}
      title="Edit Schedule"
      onConfirm={editScheduleHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Title"
            hint="Please enter your schedule title"
            required
            type="text"
            ref={titleRef}
            defaultValue={item.title}
          />
          <Label>Use the same channels registered in kernels?</Label>
          <Checkbox onChange={() => setUseSame((prev) => !prev)} checked={useSame} />
          {useSame ? (
            <>
              <Alert intent="warning">
                Note: Data provided here is registered in kernel before. If you think to register a
                channel in kernel to just using this autocomplete. Think twice.
              </Alert>
              <Label>Channel ID *</Label>
              <Combobox
                placeholder="Channel ID"
                onChange={(item) => {
                  const choice = channels.filter(
                    (channel) => channel.name.toLowerCase() === item.toLowerCase()
                  )[0];
                  setChannel(choice.value);
                }}
                items={channels.map((item) => item.name)}
                openOnFocus
              />
            </>
          ) : (
            <TextInputField
              label="Channel ID"
              hint="Please enter your channel ID"
              required
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChannel(e.target.value)}
              defaultValue={item.channel_id}
            />
          )}

          <TextareaField
            label="Description"
            hint="Please enter your schedule description/content"
            required
            ref={descRef}
            defaultValue={item.description}
          />
          <TextInputField
            label="Image URl"
            hint="Please enter your image url"
            required
            type="url"
            ref={imageRef}
            defaultValue={item.image}
          />
          <hr />
          <p>Schedule at:</p>
          <Pane display="flex" gap={5} justifyContent="space-around">
            <TextInputField
              label="Date"
              hint="Please enter your schedule date"
              required
              type="date"
              ref={dateRef}
              defaultValue={parseDate()}
            />
            <TextInputField
              label="Time"
              hint="Please enter your schedule time"
              required
              type="time"
              ref={timeRef}
              defaultValue={parseTime()}
            />
          </Pane>
        </>
      )}
    </Dialog>
  );
}
