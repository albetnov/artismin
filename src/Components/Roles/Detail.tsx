import { DetailProps } from "../../Utils/DetailProps";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function Detail({ show, setShow, item }: DetailProps) {
  return (
    <BasicModal isShown={show} title="Role Detail" onCloseComplete={() => setShow(false)}>
      {item ? (
        <>
          <p>{item.name}</p>
          <hr />
          <p>{item.value}</p>
        </>
      ) : (
        <Loading />
      )}
    </BasicModal>
  );
}
