import { getApiUrl } from "./apiConfig";
import axios from 'axios';

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate, setLoading, setOpen } = props
    setLoading(true)
    const loginUrl = getApiUrl('auth/login')
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(() => {
            axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
                let userRole = userDetails.data.roles[0].roleName
                setLoading(false)
                setOpen(true)
                navigate(userRole === 'ROLE_ADMIN' ? '/admin' : '/store', { replace: true })
            })
        })
        .catch(error => {
            setLoading(false)
            setWrongCredentials({ wrongData: true, infoText: error.response.data.message })
            setOpen(true)
        })
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

export const submitRegister = (props) => {
    const { registerData, setWrongData, setRegisterData, setOpen, setLoading, navigate } = props;
    setLoading(true)
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({ userName: "", email: "", password: "" })
        setWrongData({ status: false, infoText: response.data.message })
        setOpen(true)
        sleep(2500).then(() => {
            setLoading(false)
            navigate('/', { replace: false })
        });
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.message })
        setLoading(false)
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
            window.dispatchEvent(new Event('storage'))
        })
    })
}
export const logout = ({ navigate }) => {
    const logoutUrl = getApiUrl('auth/logout')
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
        navigate('/', { replace: true })
    })

}