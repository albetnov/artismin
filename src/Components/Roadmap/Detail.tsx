import { Image, Link, Textarea, TextInput } from "evergreen-ui";
import { DetailProps } from "../../Utils/DetailProps";
import BasicModal from "../BasicModal";
import Loading from "../Loading";

export default function Detail({ show, setShow, item }: DetailProps) {
  return (
    <BasicModal isShown={show} title="Roadmap Detail" onCloseComplete={() => setShow(false)}>
      {item ? (
        <>
          <p>{item.title}</p>
          <p>
            By {item.author_name} | <Link href={item.author_url}>{item.author_url}</Link>
          </p>
          <hr />
          <p>Content: </p>
          <Textarea disabled rows={20} value={item.content} />
          <p>Image:</p>
          <Image src={item.image} marginTop={30} width="50%" />
          <p>Footer:</p>
          <TextInput disabled value={item.footer} />
        </>
      ) : (
        <Loading />
      )}
    </BasicModal>
  );
}
