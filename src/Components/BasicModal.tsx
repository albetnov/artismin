import { Dialog, DialogProps } from "evergreen-ui";

export default function BasicModal(props: DialogProps) {
  return (
    <Dialog
      {...props}
      hasCancel={false}
      confirmLabel="Close"
      containerProps={{ className: "dark:bg-zinc-700 dark:text-white" }}
    />
  );
}
