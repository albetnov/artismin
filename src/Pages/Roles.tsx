import { Button } from "evergreen-ui";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import CommonPageBase from "../Components/CommonPageBase";
import Create from "../Components/Roles/Create";
import List from "../Components/Roles/List";
import RoleRepository from "../Repositories/RoleRepository";

export default function Roles() {
  const [roles, setRoles] = useState<DocumentData[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchRole = async () => {
    const data = await new RoleRepository().getRole();
    setRoles(data);
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <CommonPageBase heading="Manage Roles" description="Register roles to bot kernels.">
      <Button marginY={10} onClick={() => setShowCreate(true)}>
        Add Role
      </Button>
      <Create show={showCreate} setShow={setShowCreate} refetch={fetchRole} />
      <List data={roles} refetch={fetchRole} />
    </CommonPageBase>
  );
}
