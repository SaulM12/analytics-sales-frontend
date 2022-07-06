import { getApiUrl } from "./apiConfig";
import axios from 'axios';

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate } = props
    const loginUrl = getApiUrl('auth/login')
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(() => {
            axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
                let userRole = userDetails.data.roles[0].roleName
                navigate(userRole === 'ROLE_ADMIN' ? '/admin' : '/store', { replace: true })
            })
        })
        .catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.message })
        })
}

export const submitRegister = (props) => {
    const { registerData, setWrongData, setRegisterData, setOpen } = props;
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({ userName: "", email: "", password: "" })
        setWrongData({ status: false, infoText: response.data.message })
        setOpen(true)
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.message })
        setOpen(true)
    })
}
export const getUserDetails = ({ setUserName, setUserId }) => {
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        setUserName(userDetails.data.userName)
        setUserId(userDetails.data.id)
        const cartListCountUrl = getApiUrl(`shoppingList/count/${userDetails.data.id}`)
        axios.get(cartListCountUrl, { withCredentials: true }).then((response) => {
            localStorage.setItem("number", response.data.toString())
        })
    })
}
export const logout = ({ navigate }) => {
    const logoutUrl = getApiUrl('auth/logout')
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
        navigate('/', { replace: true })
    })

}