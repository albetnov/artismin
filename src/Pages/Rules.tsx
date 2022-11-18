import { Button } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import CommonPageBase from "../Components/CommonPageBase";
import Create from "../Components/Rules/Create";
import List from "../Components/Rules/List";
import RuleRepository from "../Repositories/RuleRepository";

export default function Rules() {
  const [rules, setRules] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchRules = async () => {
    const data = await new RuleRepository().getRules();
    setRules(data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <CommonPageBase heading="Manage Rules" description="Register rules to bot kernels.">
      <Button marginY={10} onClick={() => setShowCreate(true)}>
        Add Rule
      </Button>
      <Create show={showCreate} setShow={setShowCreate} refetch={fetchRules} />
      <List data={rules} refetch={fetchRules} />
    </CommonPageBase>
  );
}
