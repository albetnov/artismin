import {Button, Pane, Table} from "evergreen-ui";
import {DocumentData} from "firebase/firestore";
import Loading from "../Loading";
import {FiEdit, FiTrash} from "react-icons/fi";
import {MouseEvent, useState} from "react";
import Edit from "./Edit";
import Detail from "./Detail";
import {ListProps} from "../../Utils/ListProps";
import RoleRepository from "../../Repositories/RoleRepository";

export default function List({data, refetch}: ListProps) {
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [current, setCurrent] = useState<DocumentData>();

    if (data.length <= 0 || loading) {
        return <Loading/>;
    }

    const deleteRoleHandler = async (id: string) => {
        setLoading(true);
        await new RoleRepository().delete(id);
        await refetch();
        setLoading(false);
    };

    const editRoleHandler = (id: number) => {
        setCurrent(data[id]);
        setOpenEdit(true);
    };

    const detailRoleHandler = async (id: number) => {
        setCurrent(data[id]);
        setOpenDetail(true);
    };

    return (
        <Pane overflowX="auto">
            <Table width="fit-content">
                <Edit refetch={refetch} item={current} setShow={setOpenEdit} show={openEdit}/>
                <Detail item={current} show={openDetail} setShow={setOpenDetail}/>
                <Table.Head className="dark:bg-zinc-700 dark:text-white">
                    <Table.TextHeaderCell>No</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Role Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Role ID</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Action</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {data.map((item: DocumentData, no: number) => (
                        <Table.Row
                            className="dark:bg-zinc-700"
                            key={item.id} isSelectable onSelect={() => detailRoleHandler(no - 1)}>
                            <Table.TextCell textProps={{className: "dark:text-white"}}>{++no}</Table.TextCell>
                            <Table.TextCell textProps={{className: "dark:text-white"}}>{item.name}</Table.TextCell>
                            <Table.TextCell textProps={{className: "dark:text-white"}}>{item.value}</Table.TextCell>
                            <Table.Cell display="flex" gap={10} onClick={(e: MouseEvent) => e.stopPropagation()}>
                                <Button
                                    className="dark:bg-zinc-500 dark:text-white"
                                    onClick={() => editRoleHandler(no - 1)}>
                                    <FiEdit fontSize={70}/>
                                </Button>
                                <Button
                                    className="dark:bg-zinc-500 dark:text-white"
                                    intent="danger" onClick={() => deleteRoleHandler(item.id)}>
                                    <FiTrash fontSize={70}/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Pane>
    );
}
