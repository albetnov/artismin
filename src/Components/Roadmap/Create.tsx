import { Alert, Dialog, TextareaField, TextInputField } from "evergreen-ui";
import { useRef, useState } from "react";
import RoadmapRepository from "../../Repositories/RoadmapRepository";
import { CreateProps } from "../../Utils/CreateProps";
import Loading from "../Loading";

export default function Create({ show, setShow, refetch }: CreateProps) {
  const authorNameRef = useRef<HTMLInputElement>(null);
  const authorUrlRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const createRoadmapHandler = async () => {
    if (loading) return;

    setAlert(false);
    const authorNameInput = authorNameRef.current?.value;
    const authorUrlInput = authorUrlRef.current?.value;
    const contentInput = contentRef.current?.value;
    const footerInput = footerRef.current?.value;
    const imageInput = imageRef.current?.value;
    const titleInput = titleRef.current?.value;
    const idInput = idRef.current?.value;
    if (
      !authorNameInput ||
      !authorUrlInput ||
      !contentInput ||
      !footerInput ||
      !imageInput ||
      !titleInput ||
      !idInput
    ) {
      setAlert("Invalid inputs");
      return;
    }

    setLoading(true);
    const result = await new RoadmapRepository().createRoadmap(
      idInput,
      authorNameInput,
      authorUrlInput,
      contentInput,
      footerInput,
      imageInput,
      titleInput
    );
    await refetch();
    setLoading(false);

    if (!result) {
      setAlert(
        "Duplicating Identifier detected. Use edit instead. SOLID. S = Single Responsibility."
      );
      return;
    }

    setShow(false);
  };

  return (
    <Dialog
      isShown={show}
      title="Create Roadmap"
      onConfirm={createRoadmapHandler}
      onCloseComplete={() => setShow(false)}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Alert marginY={10} intent="warning">
            Until new structure of roadmap arise. You shall delete and recreate if one want to alter
            identifier.
          </Alert>
          <TextInputField
            label="Identifier"
            hint="Please enter the command to call this roadmap"
            required
            type="text"
            ref={idRef}
          />
          <TextInputField
            label="Title"
            hint="Please enter the title"
            required
            type="text"
            ref={titleRef}
          />
          <TextInputField
            label="Author name"
            hint="Please enter the author name"
            required
            type="text"
            ref={authorNameRef}
          />
          <TextInputField
            label="Author url"
            hint="Please enter the author url"
            required
            type="url"
            ref={authorUrlRef}
          />
          <TextareaField label="Content" hint="Enter the content" required ref={contentRef} />
          <TextInputField
            label="image"
            hint="Please enter the image url"
            required
            type="url"
            ref={imageRef}
          />
          <TextInputField
            label="Author footer"
            hint="Please enter the footer content"
            required
            type="text"
            ref={footerRef}
          />
        </>
      )}
    </Dialog>
  );
}
