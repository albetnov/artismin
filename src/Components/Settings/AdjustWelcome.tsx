import { Button, Dialog, TextareaField, TextInputField } from "evergreen-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import useCan from "../../Hooks/useCan";
import SettingsRepository from "../../Repositories/SettingsRepository";

export default function AdjustWelcome() {
  const { approved, data: value } = useCan("enable_welcome");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    welcomeTitle: "",
    welcomeDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData({
      welcomeTitle: value.welcomeTitle,
      welcomeDesc: value.welcomeDesc,
    });
  }, [value]);

  if (!approved) return <></>;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const adjustByeHandler = async () => {
    setIsLoading(true);
    await new SettingsRepository().edit("enable_welcome", data);
    setIsLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      <Dialog
        isShown={openModal}
        title="Welcome Settings"
        onCloseComplete={() => setOpenModal(false)}
        confirmLabel="Send"
        onConfirm={adjustByeHandler}
        isConfirmLoading={isLoading}
      >
        <TextInputField
          label="Title"
          value={data.welcomeTitle}
          name="welcomeTitle"
          onChange={inputChangeHandler}
        />
        <TextareaField
          label="Description"
          value={data.welcomeDesc}
          name="welcomeDesc"
          onChange={inputChangeHandler}
        />
      </Dialog>

      <Button marginLeft={5} onClick={() => setOpenModal(true)}>
        <FiSettings />
      </Button>
    </>
  );
}
