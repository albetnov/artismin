import { useRef, useState } from "react";
import { Alert, Dialog, TextInputField } from "evergreen-ui";
import Loading from "../Loading";
import { EditProps } from "../../Utils/EditProps";
import RoleRepository from "../../Repositories/RoleRepository";

export default function Edit({ show, setShow, refetch, item }: EditProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const editRoleHandler = async () => {
    if (loading || !item) return;

    setAlert(false);
    const idInput = idRef.current!.value;
    const nameInput = nameRef.current!.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new RoleRepository().editRole(item.id, nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Edit Role"
      onConfirm={editRoleHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Role name"
            hint="Please enter your role name"
            required
            type="text"
            ref={nameRef}
            defaultValue={item.name}
          />
          <TextInputField
            label="Role ID"
            hint="Please enter your role ID"
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
