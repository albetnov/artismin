import { Button, Text } from "evergreen-ui";
import Card from "../Card";

export default function Welcome() {
  return (
    <Card>
      <Text>Welcome to Artismin. A Simple Admin Dashboard for managing Artisan Bot.</Text>
      <br />
      <Button marginTop={20} appearance="primary">
        Let&apos;s Go!
      </Button>
    </Card>
  );
}
