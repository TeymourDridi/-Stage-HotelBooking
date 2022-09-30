import axios from "axios";
import axiosInstance from "../../utils/axiosInterceptor";

import {ERROR,LOGIN_ACTION,REGISTRATION_ACTION,SET_CONNECTED,LOGOUT} from "../reducers/AuthenticationReducer";
import {useNavigate} from 'react-router-dom';


export const RegistrationAction = (user,navigate,toast)=>dispatch=>{
    axios.post("http://localhost:5000/api/auth/register",user)
        .then(result=>{
            toast.current.show({severity: 'success', summary: 'Succès', detail: 'Veuiller Confirmer Votre Email'});
            dispatch({
                type:REGISTRATION_ACTION,
            })
           navigate('/auth/login')
        })
        .catch(err=>{
            toast.current.show({severity: 'error', summary: 'Erreur', detail: err.response.message});
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}

export const LoginAction = (credentials,navigate,toast)=>dispatch=>{
    axios.post("http://localhost:5000/api/auth/login",credentials,{ withCredentials: true })
        .then(result=>{
            toast.current.show({severity: 'success', summary: 'Succès', detail: 'Bienvenue'});
            dispatch({
                type:LOGIN_ACTION,
                payload:{accessToken:result.data.accessToken,refreshToken:result.data.refreshToken},
                user:result.data.user
            });
            navigate('/home')
        })
        .catch(err=>{
            toast.current.show({severity: 'error', summary: 'Erreur', detail: err.response.message});
            dispatch({
                type:ERROR,
                payload:err.response

            })
        })
}

export const setConnected=(token,user)=>dispatch=>{

    dispatch({
        type:SET_CONNECTED,
        payload:{accessToken:token.accessToken,refreshToken:token.refreshToken},
        user:user
    })
}

export const logout =(navigate,toast)=>dispatch=>{

    axios.delete("http://localhost:5000/api/auth/logout",{ withCredentials: true })
        .then(result=>{
            localStorage.removeItem('user');
            toast.current.show({severity: 'success', summary: 'Succès', detail: 'Au Revoir'});
            setTimeout(()=>{navigate('/auth/login')},1000)
            dispatch({
                type:LOGOUT
            });


        })
}
