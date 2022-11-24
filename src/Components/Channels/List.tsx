import { Button, Pane, Table } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MouseEvent, useState } from "react";
import ChannelRepository from "../../Repositories/ChannelRepository";
import Edit from "./Edit";
import Detail from "./Detail";
import { ListProps } from "../../Utils/ListProps";

export default function List({ data, refetch }: ListProps) {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [current, setCurrent] = useState<DocumentData>();

  if (data.length <= 0 || loading) {
    return <Loading />;
  }

  const deleteChannelHandler = async (id: string) => {
    setLoading(true);
    await new ChannelRepository().delete(id);
    await refetch();
    setLoading(false);
  };

  const editChannelHandler = (id: number) => {
    setCurrent(data[id]);
    setOpenEdit(true);
  };

  const detailChannelHandler = async (id: number) => {
    setCurrent(data[id]);
    setOpenDetail(true);
  };

  return (
    <Pane overflowX="auto">
      <Table width="fit-content">
        <Edit refetch={refetch} item={current} setShow={setOpenEdit} show={openEdit} />
        <Detail item={current} show={openDetail} setShow={setOpenDetail} />
        <Table.Head>
          <Table.TextHeaderCell>No</Table.TextHeaderCell>
          <Table.TextHeaderCell>Channel Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Channel ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>Action</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {data.map((item: DocumentData, no: number) => (
            <Table.Row key={item.id} isSelectable onSelect={() => detailChannelHandler(no - 1)}>
              <Table.TextCell>{++no}</Table.TextCell>
              <Table.TextCell>{item.name}</Table.TextCell>
              <Table.TextCell>{item.value}</Table.TextCell>
              <Table.Cell display="flex" gap={10} onClick={(e: MouseEvent) => e.stopPropagation()}>
                <Button onClick={() => editChannelHandler(no - 1)}>
                  <FiEdit fontSize={50} />
                </Button>
                <Button intent="danger" onClick={() => deleteChannelHandler(item.id)}>
                  <FiTrash fontSize={50} />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}
