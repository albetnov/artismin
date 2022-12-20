import { Spinner, Text } from "evergreen-ui";

export default function Loading() {
  return (
    <>
      <Spinner marginX="auto" />
      <Text textAlign="center" className="dark:text-white">
        Cotto matte
      </Text>
    </>
  );
}
