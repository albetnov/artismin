import { Button } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import CommonPageBase from "../Components/CommonPageBase";
import Create from "../Components/Roadmap/Create";
import List from "../Components/Roadmap/List";
import RoadmapRepository from "../Repositories/RoadmapRepository";

export default function Roadmap() {
  const [roadmaps, setRoadmaps] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchRoadmap = async () => {
    const data = await new RoadmapRepository().getRoadmap();
    setRoadmaps(data);
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  return (
    <CommonPageBase heading="Manage Roadmaps" description="Add new roadmap entry to the bot">
      <Button marginY={10} onClick={() => setShowCreate(true)}>
        Add Roadmap
      </Button>
      <Create show={showCreate} setShow={setShowCreate} refetch={fetchRoadmap} />
      <List data={roadmaps} refetch={fetchRoadmap} />
    </CommonPageBase>
  );
}
