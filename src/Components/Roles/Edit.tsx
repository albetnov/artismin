import {useRef, useState} from "react";
import {Alert, Dialog, Heading, Text, TextInputField} from "evergreen-ui";
import Loading from "../Loading";
import {EditProps} from "../../Utils/EditProps";
import RoleRepository from "../../Repositories/RoleRepository";

export default function Edit({show, setShow, refetch, item}: EditProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState<boolean | string>(false);
    const [loading, setLoading] = useState(false);

    const editRoleHandler = async () => {
        if (loading || !item) return;

        setAlert(false);
        const idInput = idRef.current?.value;
        const nameInput = nameRef.current?.value;
        if (!idInput || !nameInput) {
            setAlert("Invalid inputs");
            return;
        }

        setLoading(true);
        await new RoleRepository().editRole(item.id, nameInput, idInput);
        await refetch();
        setLoading(false);

        setShow(false);
    };

    return (
        <Dialog
            isShown={show}
            title={<Heading className="dark:text-white">Edit Role</Heading>}
            onConfirm={editRoleHandler}
            onCloseComplete={() => setShow(false)}
            containerProps={{className: "dark:bg-zinc-700"}}

        >
            {alert && <Alert intent="danger">{alert}</Alert>}
            {loading || !item ? (
                <Loading/>
            ) : (
                <>
                    <TextInputField
                        label={<Text className="dark:text-white">Role name</Text>}
                        hint={<Text className="dark:text-white">Please enter your role name</Text>}
                        required
                        type="text"
                        ref={nameRef}
                        className="dark:bg-zinc-500 dark:text-white"
                        defaultValue={item.name}
                    />
                    <TextInputField
                        label={<Text className="dark:text-white">Role ID</Text>}
                        hint={<Text className="dark:text-white">Please enter the Role ID</Text>}
                        required
                        type="text"
                        ref={idRef}
                        className="dark:bg-zinc-500 dark:text-white"
                        defaultValue={item.value}
                    />
                </>
            )}
        </Dialog>
    );
}
