import { Button, Table, Text } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MouseEvent, useState } from "react";
import Edit from "./Edit";
import Detail from "./Detail";
import { ListProps } from "../../Utils/ListProps";
import ScheduleRepository from "../../Repositories/ScheduleRepository";

export default function List({ data, refetch }: ListProps) {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [current, setCurrent] = useState<DocumentData>();

  if (data.length <= 0 || loading) {
    return <Loading />;
  }

  const deleteScheduleHandler = async (id: string) => {
    setLoading(true);
    await new ScheduleRepository().delete(id);
    await refetch();
    setLoading(false);
  };

  const editScheduleHandler = (id: number) => {
    setCurrent(data[id]);
    setOpenEdit(true);
  };

  const detailScheduleHandler = async (id: number) => {
    setCurrent(data[id]);
    setOpenDetail(true);
  };

  return (
    <Table>
      <Edit refetch={refetch} item={current} setShow={setOpenEdit} show={openEdit} />
      <Detail item={current} show={openDetail} setShow={setOpenDetail} />
      <Table.Head>
        <Table.TextHeaderCell>No</Table.TextHeaderCell>
        <Table.TextHeaderCell>Title</Table.TextHeaderCell>
        <Table.TextHeaderCell>Channel ID</Table.TextHeaderCell>
        <Table.TextHeaderCell>Description</Table.TextHeaderCell>
        <Table.TextHeaderCell>Image URL</Table.TextHeaderCell>
        <Table.TextHeaderCell>Execute When</Table.TextHeaderCell>
        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map((item: DocumentData, no: number) => (
          <Table.Row key={item.id} isSelectable onSelect={() => detailScheduleHandler(no - 1)}>
            <Table.TextCell>{++no}</Table.TextCell>
            <Table.TextCell>{item.title}</Table.TextCell>
            <Table.TextCell>{item.channel_id}</Table.TextCell>
            <Table.TextCell>{item.description}</Table.TextCell>
            <Table.TextCell>{item.image}</Table.TextCell>
            <Table.TextCell>{item.execute_when}</Table.TextCell>
            <Table.Cell display="flex" gap={10} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <Button onClick={() => editScheduleHandler(no - 1)}>
                <FiEdit fontSize={65} />
              </Button>
              <Button intent="danger" onClick={() => deleteScheduleHandler(item.id)}>
                <FiTrash fontSize={65} />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
