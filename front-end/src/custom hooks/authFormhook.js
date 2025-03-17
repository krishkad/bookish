import { useState } from "react"

export const useAuthForm = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [confirmpassword , setConfirmPassword] = useState('');

    const handleChangeData = (e) => {
        const {name , value} = e.target;

        setUserData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const confirmpasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    return {
        userData , handleChangeData , confirmpassword , confirmpasswordChange
    }

}