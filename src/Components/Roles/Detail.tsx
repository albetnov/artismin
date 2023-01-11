import {DetailProps} from "../../Utils/DetailProps";
import BasicModal from "../BasicModal";
import Loading from "../Loading";
import {Heading} from "evergreen-ui";

export default function Detail({show, setShow, item}: DetailProps) {
    return (
        <BasicModal
            title={<Heading className="dark:text-white">Role Detail</Heading>}
            isShown={show}
            onCloseComplete={() => setShow(false)}>
            {item ? (
                <>
                    <p>{item.name}</p>
                    <hr/>
                    <p>{item.value}</p>
                </>
            ) : (
                <Loading/>
            )}
        </BasicModal>
    );
}
