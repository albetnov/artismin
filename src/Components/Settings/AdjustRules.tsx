import { Button, Dialog, TextareaField, TextInputField } from "evergreen-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import useCan from "../../Hooks/useCan";
import SettingsRepository from "../../Repositories/SettingsRepository";

export default function AdjustRules() {
  const { approved, data: value } = useCan("enable_rules");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    dmTitle: "",
    dmImg: "",
    dmDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData({
      dmTitle: value.dmTitle,
      dmImg: value.dmImg,
      dmDesc: value.dmDesc,
    });
  }, [value]);

  if (!approved) return <></>;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const adjustByeHandler = async () => {
    setIsLoading(true);
    await new SettingsRepository().edit("enable_rules", data);
    setIsLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      <Dialog
        isShown={openModal}
        title="Rules DM Settings"
        onCloseComplete={() => setOpenModal(false)}
        confirmLabel="Send"
        onConfirm={adjustByeHandler}
        isConfirmLoading={isLoading}
      >
        <TextInputField
          label="Title"
          value={data.dmTitle}
          name="dmTitle"
          onChange={inputChangeHandler}
        />
        <TextInputField
          label="Image"
          value={data.dmImg}
          name="dmImg"
          onChange={inputChangeHandler}
        />
        <TextareaField
          label="Description"
          value={data.dmDesc}
          name="dmDesc"
          onChange={inputChangeHandler}
        />
      </Dialog>

      <Button marginLeft={5} onClick={() => setOpenModal(true)}>
        <FiSettings />
      </Button>
    </>
  );
}
