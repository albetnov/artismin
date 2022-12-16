import { Button, Dialog, TextareaField, TextInputField } from "evergreen-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import useCan from "../../Hooks/useCan";
import SettingsRepository from "../../Repositories/SettingsRepository";

export default function AdjustBye() {
  const { approved, data: value } = useCan("enable_bye");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    byeTitle: "",
    byeImg: "",
    byeDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData({
      byeTitle: value.byeTitle,
      byeImg: value.byeImg,
      byeDesc: value.byeDesc,
    });
  }, [value]);

  if (!approved) return <></>;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const adjustByeHandler = async () => {
    setIsLoading(true);
    await new SettingsRepository().edit("enable_bye", data);
    setIsLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      <Dialog
        isShown={openModal}
        title="Bye Settings"
        onCloseComplete={() => setOpenModal(false)}
        confirmLabel="Send"
        onConfirm={adjustByeHandler}
        isConfirmLoading={isLoading}
      >
        <TextInputField
          label="Title"
          value={data.byeTitle}
          name="byeTitle"
          onChange={inputChangeHandler}
        />
        <TextInputField
          label="Image"
          value={data.byeImg}
          name="byeImg"
          onChange={inputChangeHandler}
        />
        <TextareaField
          label="Description"
          value={data.byeDesc}
          name="byeDesc"
          onChange={inputChangeHandler}
        />
      </Dialog>

      <Button marginLeft={5} onClick={() => setOpenModal(true)}>
        <FiSettings />
      </Button>
    </>
  );
}
