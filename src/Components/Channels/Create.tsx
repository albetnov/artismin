import { Alert, Dialog, TextInputField } from "evergreen-ui";
import { useRef, useState } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import Loading from "../Loading";

interface CreateProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function Create({ show, setShow }: CreateProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const createChannelHandler = async () => {
    if (loading) return;

    setAlert(false);
    const idInput = idRef.current!.value;
    const nameInput = nameRef.current!.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new ChannelRepository().createChannel(nameInput, idInput);
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Create Channel"
      onConfirm={createChannelHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Channel name"
            hint="Please enter your channel name"
            required
            type="text"
            ref={nameRef}
          />
          <TextInputField
            label="Channel ID"
            hint="Please enter your channel ID"
            required
            type="text"
            ref={idRef}
          />
        </>
      )}
    </Dialog>
  );
}
