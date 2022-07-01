import { getApiUrl } from "./apiConfig";
import axios from 'axios';

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate } = props
    const loginUrl = getApiUrl('auth/login')
    const userDetailsUrl = getApiUrl('auth/userDetails')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(() => {
            axios.get(userDetailsUrl,{withCredentials:true }).then(userDetails=>{
                let userRole=userDetails.data.roles[0].roleName
                navigate(userRole==='ROLE_ADMIN'?'/admin':'/store', { replace: true })
            })
        
        })
        .catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.message })
        })

}

export const submitRegister = (props) => {
    const { registerData, setWrongData, setRegisterData } = props;
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({
            userName: "",
            email: "",
            password: ""
        })
        setWrongData({ status: false, infoText: response.data.message })
    }).catch(error => {
        setWrongData({ status: true, infoText: error.response.data.message })
    })
}