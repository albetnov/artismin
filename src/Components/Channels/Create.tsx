import { Alert, Dialog, Heading, Text, TextInputField } from "evergreen-ui";
import { useRef, useState } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import { CreateProps } from "../../Utils/CreateProps";
import Loading from "../Loading";

export default function Create({ show, setShow, refetch }: CreateProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const createChannelHandler = async () => {
    if (loading) return;

    setAlert(false);
    const idInput = idRef.current?.value;
    const nameInput = nameRef.current?.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new ChannelRepository().createChannel(nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title={<Heading className="dark:text-white">Create Channel</Heading>}
      onConfirm={createChannelHandler}
      onCloseComplete={() => setShow(false)}
      containerProps={{ className: "dark:bg-zinc-700" }}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label={<Text className="dark:text-white">Channel name</Text>}
            hint={<Text className="dark:text-white">Please enter your channel name</Text>}
            required
            type="text"
            ref={nameRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Channel ID</Text>}
            hint={<Text className="dark:text-white">Please enter your channel ID</Text>}
            required
            className="dark:bg-zinc-500 dark:text-white"
            type="text"
            ref={idRef}
          />
        </>
      )}
    </Dialog>
  );
}
