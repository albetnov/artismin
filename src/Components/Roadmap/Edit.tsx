import { useRef, useState } from "react";
import { Alert, Dialog, Heading, Text, TextareaField, TextInputField } from "evergreen-ui";
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
    const authorNameInput = authorNameRef.current?.value;
    const authorUrlInput = authorUrlRef.current?.value;
    const contentInput = contentRef.current?.value;
    const footerInput = footerRef.current?.value;
    const imageInput = imageRef.current?.value;
    const titleInput = titleRef.current?.value;
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
      title={<Heading className="dark:text-white">Edit Roadmap</Heading>}
      onConfirm={editRoadmapHandler}
      onCloseComplete={() => setShow(false)}
      containerProps={{ className: "dark:bg-zinc-700" }}
    >
      {alert && <Alert intent="danger">{alert}</Alert>}
      {loading || !item ? (
        <Loading />
      ) : (
        <>
          <TextInputField
            label={<Text className="dark:text-white">Title</Text>}
            hint={<Text className="dark:text-white">Please enter the title</Text>}
            required
            type="text"
            ref={titleRef}
            defaultValue={item.title}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author name</Text>}
            hint={<Text className="dark:text-white">Please enter the author name</Text>}
            required
            type="text"
            ref={authorNameRef}
            defaultValue={item.author_name}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author url</Text>}
            hint={<Text className="dark:text-white">Please enter the author url</Text>}
            required
            type="url"
            ref={authorUrlRef}
            defaultValue={item.author_url}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextareaField
            label={<Text className="dark:text-white">Content</Text>}
            hint={<Text className="dark:text-white">Enter the content</Text>}
            required
            ref={contentRef}
            defaultValue={item.content}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">image</Text>}
            hint={<Text className="dark:text-white">Please enter the image url</Text>}
            required
            type="url"
            ref={imageRef}
            defaultValue={item.image}
            className="dark:bg-zinc-500 dark:text-white"
          />
          <TextInputField
            label={<Text className="dark:text-white">Author footer</Text>}
            hint={<Text className="dark:text-white">Please enter the footer content</Text>}
            required
            type="text"
            ref={footerRef}
            defaultValue={item.footer}
            className="dark:bg-zinc-500 dark:text-white"
          />
        </>
      )}
    </Dialog>
  );
}
