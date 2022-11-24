import { useRef, useState } from "react";
import { Alert, Dialog, TextInputField } from "evergreen-ui";
import Loading from "../Loading";
import { EditProps } from "../../Utils/EditProps";
import RuleRepository from "../../Repositories/RuleRepository";

export default function Edit({ show, setShow, refetch, item }: EditProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const editRuleHandler = async () => {
    if (loading || !item) return;

    setAlert(false);
    const idInput = idRef.current?.value;
    const nameInput = nameRef.current?.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new RuleRepository().editRule(item.id, nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Edit Rule"
      onConfirm={editRuleHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Title"
            hint="Please enter your rule title"
            required
            type="text"
            ref={nameRef}
            defaultValue={item.name}
          />
          <TextInputField
            label="Content"
            hint="Please enter about your rule"
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
