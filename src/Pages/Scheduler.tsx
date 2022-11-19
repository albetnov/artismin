import { Button } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommonPageBase from "../Components/CommonPageBase";
import Create from "../Components/Schedules/Create";
import List from "../Components/Schedules/List";
import ScheduleRepository from "../Repositories/ScheduleRepository";

export default function Scheduler() {
  const [schedules, setSchedules] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchSchedules = async () => {
    const data = await new ScheduleRepository().getSchedule();
    setSchedules(data);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <CommonPageBase heading="Manage Schedules" description="Add new schedule entry to the bot.">
      <Button marginY={10} onClick={() => setShowCreate(true)}>
        Add Schedule
      </Button>
      <Create show={showCreate} setShow={setShowCreate} refetch={fetchSchedules} />
      <List data={schedules} refetch={fetchSchedules} />
    </CommonPageBase>
  );
}
