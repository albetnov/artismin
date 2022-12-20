import { Alert, Dialog, Heading, Text, TextareaField, TextInputField } from "evergreen-ui";
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
      title={<Heading className="dark:text-white">Create Roadmap</Heading>}
      onConfirm={createRoadmapHandler}
      onCloseComplete={() => setShow(false)}
      containerProps={{ className: "dark:bg-zinc-700" }}
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
            label={<Text className="dark:text-white">Identifier</Text>}
            hint={
              <Text className="dark:text-white">Please enter the command to call this roadmap</Text>
            }
            required
            type="text"
            ref={idRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Title</Text>}
            hint={<Text className="dark:text-white">Please enter the title</Text>}
            required
            type="text"
            ref={titleRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author name</Text>}
            hint={<Text className="dark:text-white">Please enter the author name</Text>}
            required
            type="text"
            ref={authorNameRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author url</Text>}
            hint={<Text className="dark:text-white">Please enter the author url</Text>}
            required
            type="url"
            ref={authorUrlRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextareaField
            label={<Text className="dark:text-white">Content</Text>}
            hint={<Text className="dark:text-white">Enter the content</Text>}
            required
            ref={contentRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">image</Text>}
            hint={<Text className="dark:text-white">Please enter the image url</Text>}
            required
            type="url"
            ref={imageRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author footer</Text>}
            hint={<Text className="dark:text-white">Please enter the footer content</Text>}
            required
            type="text"
            ref={footerRef}
            className="dark:bg-zinc-500 dark:text-white"
          />
        </>
      )}
    </Dialog>
  );
}
