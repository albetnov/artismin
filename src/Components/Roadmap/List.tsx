import { Button, Table } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MouseEvent, useState } from "react";
import Edit from "./Edit";
import Detail from "./Detail";
import { ListProps } from "../../Utils/ListProps";
import RoadmapRepository from "../../Repositories/RoadmapRepository";

export default function List({ data, refetch }: ListProps) {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [current, setCurrent] = useState<DocumentData>();

  if (data.length <= 0 || loading) {
    return <Loading />;
  }

  const deleteRoadmapHandler = async (id: string) => {
    setLoading(true);
    await new RoadmapRepository().delete(id);
    await refetch();
    setLoading(false);
  };

  const editRoadmapHandler = (id: number) => {
    setCurrent(data[id]);
    setOpenEdit(true);
  };

  const detailRoadmapHandler = async (id: number) => {
    setCurrent(data[id]);
    setOpenDetail(true);
  };

  return (
    <Table maxWidth="full">
      <Edit refetch={refetch} item={current} setShow={setOpenEdit} show={openEdit} />
      <Detail item={current} show={openDetail} setShow={setOpenDetail} />
      <Table.Head>
        <Table.TextHeaderCell>No</Table.TextHeaderCell>
        <Table.TextHeaderCell>Command</Table.TextHeaderCell>
        <Table.TextHeaderCell>Author Name</Table.TextHeaderCell>
        <Table.TextHeaderCell>Author URL</Table.TextHeaderCell>
        <Table.TextHeaderCell>Title</Table.TextHeaderCell>
        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map((item: DocumentData, no: number) => (
          <Table.Row key={item.id} isSelectable onSelect={() => detailRoadmapHandler(no - 1)}>
            <Table.TextCell>{++no}</Table.TextCell>
            <Table.TextCell>{item.id}</Table.TextCell>
            <Table.TextCell>{item.author_name}</Table.TextCell>
            <Table.TextCell>
              {item.author_url.length > 20
                ? item.author_url.substring(0, 20) + "..."
                : item.author_url}
            </Table.TextCell>
            <Table.TextCell>{item.title}</Table.TextCell>
            <Table.Cell display="flex" gap={10} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <Button onClick={() => editRoadmapHandler(no - 1)}>
                <FiEdit fontSize={100} />
              </Button>
              <Button intent="danger" onClick={() => deleteRoadmapHandler(item.id)}>
                <FiTrash fontSize={100} />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
