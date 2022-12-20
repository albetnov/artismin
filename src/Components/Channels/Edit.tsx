import { useRef, useState } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import { Alert, Dialog, Heading, Text, TextInputField } from "evergreen-ui";
import Loading from "../Loading";
import { EditProps } from "../../Utils/EditProps";

export default function Edit({ show, setShow, refetch, item }: EditProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const editChannelHandler = async () => {
    if (loading || !item) return;

    setAlert(false);
    const idInput = idRef.current?.value;
    const nameInput = nameRef.current?.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new ChannelRepository().editChannel(item.id, nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title={<Heading className="dark:text-white">Edit Channel</Heading>}
      onConfirm={editChannelHandler}
      onCloseComplete={() => setShow(false)}
      containerProps={{ className: "dark:bg-zinc-700" }}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label={<Text className="dark:text-white">Channel name</Text>}
            hint={<Text className="dark:text-white">Please enter your channel name</Text>}
            required
            type="text"
            ref={nameRef}
            defaultValue={item.name}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Channel ID</Text>}
            hint={<Text className="dark:text-white">Please enter your channel id</Text>}
            required
            type="text"
            ref={idRef}
            defaultValue={item.value}
            className="dark:bg-zinc-500 dark:text-white"
          />
        </>
      )}
    </Dialog>
  );
}
