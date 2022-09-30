
import {Link,useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch,useSelector} from "react-redux";
import {LoginAction} from "../redux/actions/AuthenticationActions";
import { Toast } from 'primereact/toast';
const Login =(props)=>{
    let toast = useRef()
    const {register, handleSubmit,formState:{errors}}=useForm();
    const dispatch = useDispatch();
    const AuthState = useSelector(state => state.Auth);
    const navigate=useNavigate();
    const submit = async(data)=>{
        dispatch(LoginAction(data,props.navigate,props.toast))

    }

    useEffect(()=>{

       /* AuthState.isConnected && localStorage.setItem('authTokens',JSON.stringify(AuthState.tokens))*/
        AuthState.isConnected && localStorage.setItem('user',JSON.stringify(AuthState.user))
        /*localStorage.getItem('user') && navigate('/');*/
    },[AuthState.isConnected])

    return(
        <div>


                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                        <div className="card-body p-md-5 mx-md-4">


                                            <div className="LogoTitle">
                                                <div className='site-logo'>
                                                    <img src="/assets/images/poste-logo.jpg" alt="logo" className="imgLogin"/>
                                                </div>

                                                <div className="homepage-titles">
                                                    <h4 className="mt-1 mb-5 pb-1">Connexion A Votre Compte </h4>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmit(submit)}>


                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Nom D'utilisateur ou Email</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="Entrez..." {...register("username",{required:true,pattern:'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'})} />

                                                </div>

                                                {(errors.email?.type ==="required") && <div className="alert alert-danger" role="alert">Obligatoire*</div>}
                                                {(errors.email?.type ==="pattern") && <div className="alert alert-danger" role="alert">invalid</div>}
                                                {AuthState?.error?.data?.error && <div className="alert alert-danger" role="alert">
                                                    {AuthState?.error?.data?.error}
                                                </div>}

                                                <div className="form-outline mb-4">
                                                    <label className="form-label"
                                                           htmlFor="form2Example22">Mot de Passe</label>
                                                    <input type="password" id="form2Example22"
                                                           className="form-control" {...register("password",{required:true,minLength:8})} />

                                                </div>
                                                {(errors.password?.type ==="required") && <div className="alert alert-danger" role="alert">Obligatoire*</div>}
                                                {(errors.password?.type ==="minLength") && <div className="alert alert-danger" role="alert">Au moins 8 characters</div>}

                                                {AuthState?.error?.data?.error && <div className="alert alert-danger" role="alert">
                                                    {AuthState?.error?.data?.error}
                                                </div>}

                                                <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                                    <button
                                                        className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                        type="submit">Log in
                                                    </button>
                                                    {/* {AuthState.error.data?.error} */}
                                                    <pre> </pre>

                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <p className="mb-0 me-2">Pas De Compte?</p>
                                                    <Link to='/auth/Signup' className="btn btn-outline-success">Crée</Link>
                                                </div>

                                            </form>



                                        </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default Login;
