import { Button, Table } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import { FiEdit, FiTrash } from "react-icons/fi";
import { MouseEvent, useState } from "react";
import Edit from "./Edit";
import Detail from "./Detail";
import { ListProps } from "../../Utils/ListProps";
import RuleRepository from "../../Repositories/RuleRepository";

export default function List({ data, refetch }: ListProps) {
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [current, setCurrent] = useState<DocumentData>();

  if (data.length <= 0 || loading) {
    return <Loading />;
  }

  const deleteRuleHandler = async (id: string) => {
    setLoading(true);
    await new RuleRepository().delete(id);
    await refetch();
    setLoading(false);
  };

  const editRuleHandler = (id: number) => {
    setCurrent(data[id]);
    setOpenEdit(true);
  };

  const detailRuleHandler = async (id: number) => {
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
        <Table.TextHeaderCell>Content</Table.TextHeaderCell>
        <Table.TextHeaderCell>Action</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map((item: DocumentData, no: number) => (
          <Table.Row key={item.id} isSelectable onSelect={() => detailRuleHandler(no - 1)}>
            <Table.TextCell>{++no}</Table.TextCell>
            <Table.TextCell>{item.name}</Table.TextCell>
            <Table.TextCell>
              {item.value.length > 20 ? item.value.substring(0, 20) + "..." : item.value}
            </Table.TextCell>
            <Table.Cell display="flex" gap={10} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <Button onClick={() => editRuleHandler(no - 1)}>
                <FiEdit fontSize={70} />
              </Button>
              <Button intent="danger" onClick={() => deleteRuleHandler(item.id)}>
                <FiTrash fontSize={70} />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
