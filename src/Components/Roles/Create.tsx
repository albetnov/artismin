import { Alert, Dialog, TextInputField } from "evergreen-ui";
import { useRef, useState } from "react";
import RoleRepository from "../../Repositories/RoleRepository";
import { CreateProps } from "../../Utils/CreateProps";
import Loading from "../Loading";

export default function Create({ show, setShow, refetch }: CreateProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const createRoleHandler = async () => {
    if (loading) return;

    setAlert(false);
    const idInput = idRef.current!.value;
    const nameInput = nameRef.current!.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new RoleRepository().createRole(nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Create Role"
      onConfirm={createRoleHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Role name"
            hint="Please enter your role name"
            required
            type="text"
            ref={nameRef}
          />
          <TextInputField
            label="Role ID"
            hint="Please enter your role ID"
            required
            type="text"
            ref={idRef}
          />
        </>
      )}
    </Dialog>
  );
}
