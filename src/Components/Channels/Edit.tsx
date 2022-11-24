import { useRef, useState } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import { Alert, Dialog, TextInputField } from "evergreen-ui";
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
      title="Edit Channel"
      onConfirm={editChannelHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Channel name"
            hint="Please enter your channel name"
            required
            type="text"
            ref={nameRef}
            defaultValue={item.name}
          />
          <TextInputField
            label="Channel ID"
            hint="Please enter your channel ID"
            required
            type="text"
            ref={idRef}
            defaultValue={item.value}
          />
        </>
      )}
    </Dialog>
  );
}
