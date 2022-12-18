import { Heading, Table } from "evergreen-ui";
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
      <Heading className="dark:text-white">Latest Crash Log</Heading>
      <br />
      <BasicModal
        isShown={openDetail}
        title={<Heading className="dark:text-white">Exception Detail</Heading>}
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
          <Table.Head className="dark:bg-zinc-700">
            <Table.TextHeaderCell textProps={{ className: "dark:text-white" }}>
              No.
            </Table.TextHeaderCell>
            <Table.TextHeaderCell textProps={{ className: "dark:text-white" }}>
              Message
            </Table.TextHeaderCell>
            <Table.TextHeaderCell textProps={{ className: "dark:text-white" }}>
              Details
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {logs.map((item: DocumentData, id: number) => (
              <Table.Row
                className="dark:bg-zinc-700 dark:border-none"
                key={id}
                isSelectable
                onSelect={() => showDetail(id)}
              >
                <Table.TextCell textProps={{ className: "dark:text-white" }}>{++id}</Table.TextCell>
                <Table.TextCell textProps={{ className: "dark:text-white" }}>
                  {item.message}
                </Table.TextCell>
                <Table.TextCell textProps={{ className: "dark:text-white" }}>
                  {item.details}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Card>
  );
}
