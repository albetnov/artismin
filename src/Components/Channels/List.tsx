import { Button, Table } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import { FiEdit, FiTrash } from "react-icons/fi";

interface ListProps {
  data: DocumentData;
}

export default function List({ data }: ListProps) {
  if (data.length <= 0) {
    return <Loading />;
  }

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>No</Table.TextHeaderCell>
        <Table.TextHeaderCell>Channel Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Channel ID</Table.TextHeaderCell>
        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map((item: DocumentData, no: number) => (
          <Table.Row id={item.id}>
            <Table.TextCell>{++no}</Table.TextCell>
            <Table.TextCell>{item.name}</Table.TextCell>
            <Table.TextCell>{item.value}</Table.TextCell>
            <Table.Cell display="flex" gap={10}>
              <Button>
                <FiEdit fontSize={50} />
              </Button>
              <Button intent="danger">
                <FiTrash fontSize={50} />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
