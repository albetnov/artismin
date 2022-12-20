import { Heading } from "evergreen-ui";
import { DetailProps } from "../../Utils/DetailProps";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function Detail({ show, setShow, item }: DetailProps) {
  return (
    <BasicModal
      isShown={show}
      title={<Heading className="dark:text-white">Channel Detail</Heading>}
      onCloseComplete={() => setShow(false)}
    >
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
