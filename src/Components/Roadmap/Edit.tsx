import { useRef, useState } from "react";
import { Alert, Dialog, TextareaField, TextInputField } from "evergreen-ui";
import Loading from "../Loading";
import { EditProps } from "../../Utils/EditProps";
import RoadmapRepository from "../../Repositories/RoadmapRepository";

export default function Edit({ show, setShow, refetch, item }: EditProps) {
  const authorNameRef = useRef<HTMLInputElement>(null);
  const authorUrlRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const editRoadmapHandler = async () => {
    if (loading || !item) return;

    setAlert(false);
    const authorNameInput = authorNameRef.current!.value;
    const authorUrlInput = authorUrlRef.current!.value;
    const contentInput = contentRef.current!.value;
    const footerInput = footerRef.current!.value;
    const imageInput = imageRef.current!.value;
    const titleInput = titleRef.current!.value;
    if (
      !authorNameInput ||
      !authorUrlInput ||
      !contentInput ||
      !footerInput ||
      !imageInput ||
      !titleInput
    ) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    await new RoadmapRepository().editRoadmap(
      item.id,
      authorNameInput,
      authorUrlInput,
      contentInput,
      footerInput,
      imageInput,
      titleInput
    );
    await refetch();
    setLoading(false);

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Edit Roadmap"
      onConfirm={editRoadmapHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label="Title"
            hint="Please enter the title"
            required
            type="text"
            ref={titleRef}
            defaultValue={item.title}
          />
          <TextInputField
            label="Author name"
            hint="Please enter the author name"
            required
            type="text"
            ref={authorNameRef}
            defaultValue={item.author_name}
          />
          <TextInputField
            label="Author url"
            hint="Please enter the author url"
            required
            type="url"
            ref={authorUrlRef}
            defaultValue={item.author_url}
          />
          <TextareaField
            label="Content"
            hint="Enter the content"
            required
            ref={contentRef}
            defaultValue={item.content}
          />
          <TextInputField
            label="image"
            hint="Please enter the image url"
            required
            type="url"
            ref={imageRef}
            defaultValue={item.image}
          />
          <TextInputField
            label="Author footer"
            hint="Please enter the footer content"
            required
            type="text"
            ref={footerRef}
            defaultValue={item.footer}
          />
        </>
      )}
    </Dialog>
  );
}
