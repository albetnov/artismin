import {useState} from "react";

export default function loginModel() {
    const [visible, setVisible] = useState(false);

    const onVisibleChange =  () => {
        setVisible(prev => !prev);
    }

    return {
        isPasswordVisible: visible,
        setPasswordVisibility: onVisibleChange
    }
}