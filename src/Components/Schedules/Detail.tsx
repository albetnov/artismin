import { Image, Textarea } from "evergreen-ui";
import { DetailProps } from "../../Utils/DetailProps";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function Detail({ show, setShow, item }: DetailProps) {
  return (
    <BasicModal isShown={show} title="Schedule Detail" onCloseComplete={() => setShow(false)}>
      {item ? (
        <>
          <p>{item.title}</p>
          <hr />
          <p>Channel ID: {item.channel_id}</p>
          <Textarea value={item.description} rows={10} disabled />
          <Image src={item.image} marginTop={30} width="50%" />
          <p>Execute When: {item.execute_when}</p>
        </>
      ) : (
        <Loading />
      )}
    </BasicModal>
  );
}
