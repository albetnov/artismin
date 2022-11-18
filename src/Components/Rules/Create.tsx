import { Alert, Dialog, TextInputField } from "evergreen-ui";
import { useRef, useState } from "react";
import RuleRepository from "../../Repositories/RuleRepository";
import { CreateProps } from "../../Utils/CreateProps";
import Loading from "../Loading";

export default function Create({ show, setShow, refetch }: CreateProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const createRuleHandler = async () => {
    if (loading) return;

    setAlert(false);
    const idInput = idRef.current!.value;
    const nameInput = nameRef.current!.value;
    if (!idInput || !nameInput) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new RuleRepository().createRule(nameInput, idInput);
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Create Rule"
      onConfirm={createRuleHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Title"
            hint="Please enter your rule title"
            required
            type="text"
            ref={nameRef}
          />
          <TextInputField
            label="Content"
            hint="Please enter about your rule"
            required
            type="text"
            ref={idRef}
          />
        </>
      )}
    </Dialog>
  );
}
