import {Alert, Dialog, Heading, TextInputField, Text} from "evergreen-ui";
import {useRef, useState} from "react";
import RoleRepository from "../../Repositories/RoleRepository";
import {CreateProps} from "../../Utils/CreateProps";
import Loading from "../Loading";

export default function Create({show, setShow, refetch}: CreateProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState<boolean | string>(false);
    const [loading, setLoading] = useState(false);

    const createRoleHandler = async () => {
        if (loading) return;

        setAlert(false);
        const idInput = idRef.current?.value;
        const nameInput = nameRef.current?.value;
        if (!idInput || !nameInput) {
            setAlert("Invalid inputs");
            return;
        }

        setLoading(true);
        await new RoleRepository().createRole(nameInput, idInput);
        await refetch();
        setLoading(false);

        setShow(false);
    };

    return (
        <Dialog
            isShown={show}
            title={<Heading className="dark:text-white">Create Role</Heading>}
            onConfirm={createRoleHandler}
            onCloseComplete={() => setShow(false)}
            containerProps={{className: "dark:bg-zinc-700"}}
        >
            {alert && <Alert intent="danger">{alert}</Alert>}
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <TextInputField
                        label={<Text className="dark:text-white">Role name</Text>}
                        hint={
                            <Text className="dark:text-white">Please enter your role name</Text>
                        }
                        required
                        type="text"
                        ref={nameRef}
                        className="dark:bg-zinc-500 dark:text-white"
                    />
                    <TextInputField
                        label={<Text className="dark:text-white">Role ID</Text>}
                        hint={
                            <Text className="dark:text-white">Please enter your role ID</Text>
                        }
                        required
                        type="text"
                        className="dark:bg-zinc-500 dark:text-white"
                        ref={idRef}
                    />
                </>
            )}
        </Dialog>
    );
}
