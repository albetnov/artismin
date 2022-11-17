import { Table, Text } from "evergreen-ui";
import Card from "../Card";
import { useEffect, useState } from "react";
import LogRepository from "../../Repositories/LogRepository";
import { DocumentData } from "firebase/firestore";
import Loading from "../Loading";
import BasicModal from "../BasicModal";

export default function CrashLog() {
  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [details, setDetails] = useState<DocumentData>();

  useEffect(() => {
    const log = new LogRepository();
    const fetchLog = async () => {
      const result = await log.getLog();
      setLogs(result);
    };
    fetchLog();
  }, []);

  const showDetail = (id: number) => {
    setDetails(logs[id - 1]);
    setOpenDetail(true);
  };

  return (
    <Card>
      <Text>Latest Crash Log</Text>
      <br />
      <BasicModal
        isShown={openDetail}
        title="Exception Detail"
        onCloseComplete={() => setOpenDetail(false)}
      >
        {details ? (
          <>
            <p>{details.message}</p>
            <hr />
            <p>{details.details}</p>
          </>
        ) : (
          <Loading />
        )}
      </BasicModal>
      {logs.length <= 0 ? (
        <Loading />
      ) : (
        <Table width="full">
          <Table.Head>
            <Table.TextHeaderCell>No.</Table.TextHeaderCell>
            <Table.TextHeaderCell>Message</Table.TextHeaderCell>
            <Table.TextHeaderCell>Details</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {logs.map((item: DocumentData, id: number) => (
              <Table.Row key={id} isSelectable onSelect={() => showDetail(id)}>
                <Table.TextCell>{++id}</Table.TextCell>
                <Table.TextCell>{item.message}</Table.TextCell>
                <Table.TextCell>{item.details}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Card>
  );
}
