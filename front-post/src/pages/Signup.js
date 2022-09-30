
import {Link} from "react-router-dom";
import React, {useRef} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {RegistrationAction} from "../redux/actions/AuthenticationActions";
import { Toast } from 'primereact/toast';
const Signup =(props)=>{

    const {register, handleSubmit,control, formState:{errors}}= useForm();
    const [matchPwd,setMatchPwd] = useState(false);
    //const [confirmCreate,setConfirmCreate]=useState(false);
    const dispatch = useDispatch();
    const AuthState = useSelector(state=>state.Auth);
    const submit = (data)=>{

        setMatchPwd(true);
        var formData = new FormData();

        formData.append("username",data.username);
        formData.append("email",data.email);
        formData.append("name",data.name);
        formData.append("lastname",data.lastname);
        formData.append("password",data.password);
        //formData.append("confirmPwd",data.confirmPwd);
        formData.append("city",data.city);
        formData.append("phone",data.phone);
        formData.append("gender",data.gender);
        formData.append("img",data.img['0']);
        formData.append("birthDate",data.birthDate);
        formData.append("isAdmin",data.isAdmin);

        dispatch(RegistrationAction(formData,props.navigate,props.toast))
    }

function confirm(e){

    control._fields.confirmPwd._f.ref.value=e;

    if(control._fields.confirmPwd._f.ref.value ===control._fields.password._f.ref.value){setMatchPwd(true);console.log(matchPwd)}else{setMatchPwd(false)}
    }

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
                                            <h4 className="mt-1 mb-5 pb-1">Create an account </h4>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>
                                        <p>Veuillez Remplir Vos Informations</p>


                                        <div className="formUnit">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Nom</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Nom" {...register("name", {required: true})}/>
                                                {(errors.name?.type) &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    Votre Nom est Obligatoir*
                                                </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Prenom</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Prenom" {...register("lastname", {required: true})}/>
                                                {(errors.lastname?.type) &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    Prenom est Obligatoir*
                                                </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit">
                                            <div className="form-outline col-5 mb-4 ">
                                                <label className="form-label" htmlFor="form2Example11">Nom d'Utilisateur</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="nom d'utilisateur" {...register("username", {required: true})}/>
                                                {(errors.username?.type) &&

                                                <div className="d-flex justify-content-center alert alert-danger " style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    nom d'utilisateur est Obligatoir*
                                                </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Email</label>
                                                <input type="email" id="form2Example11" className="form-control"
                                                       placeholder="Email" {...register("email", {
                                                    required: true,
                                                    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                                })}/>
                                                {errors.email?.type === "required" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    email is required
                                                </div>}
                                                {errors.email?.type === "pattern" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    email format est invalid
                                                </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Mot De Passe</label>
                                                <input type="password" id="form2Example11" className="form-control"
                                                       placeholder="******" {...register("password", {
                                                    required: true,
                                                    minLength: 8
                                                })} onChange={(e)=>{control._fields.password._f.ref.value=e.target.value;if(control._fields.password._f.ref.value===control._fields.confirmPwd._f.ref.value){setMatchPwd(true)}else{setMatchPwd(false)}}}/>
                                                {errors.password?.type === "required" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    Mot De Passe est Obligatoir*
                                                </div>}
                                                {errors.password?.type === "minLength" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    Mot De Passe doit avoir au minimum 8 characteres
                                                </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Confirmer
                                                    Mot De Passe</label>
                                                {matchPwd+"sdsd"}
                                                <input type="password" id="form2Example11" className="form-control"
                                                       placeholder="******" {...register("confirmPwd", {required: true})} onChange={(e)=>confirm(e.target.value)}/>

                                                {!matchPwd &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    the two passwords must match !
                                                </div>}
                                            </div>
                                        </div>

                                        <div className="formUnit">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Gouvernat</label>
                                                <select className="form-select" {...register("city")}>
                                                    <option value="Ariana">Ariana</option>
                                                    <option value="Beja">Beja</option>
                                                    <option value="Ben Arous">Ben Arous</option>
                                                    <option value="Bizerte">Bizerte</option>
                                                    <option value="Gabès">Gabès</option>
                                                    <option value="Gafsa">Gafsa</option>
                                                    <option value="Jendouba">Jendouba</option>
                                                    <option value="Kairouan">Kairouan</option>
                                                    <option value="Kasserine">Kasserine</option>
                                                    <option value="Kebili">Kebili</option>
                                                    <option value="Le Kef">Le Kef</option>
                                                    <option value="Mahdia">Mahdia</option>
                                                    <option value="La Manouba">La Manouba</option>
                                                    <option value="Medenine">Medenine</option>
                                                    <option value="Monastir">Monastir</option>
                                                    <option value="Nabeul">Nabeul</option>
                                                    <option value="Sfax">Sfax</option>
                                                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                                                    <option value="Siliana">Siliana</option>
                                                    <option value="Sousse">Sousse</option>
                                                    <option value="Tataouine">Tataouine</option>
                                                    <option value="Tozeur">Tozeur</option>
                                                    <option value="Tunis">Tunis</option>
                                                    <option value="Zaghouan">Zaghouan</option>
                                                </select>
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Télephone</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="71839000" {...register("phone", {
                                                    required: true,
                                                    minLength: 8,
                                                    maxLength: 8
                                                })}/>
                                                {errors.phone?.type === "required" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    Télephone est obligatoire*
                                                </div>}
                                                {errors.phone?.type === "minLength" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    8 numeros
                                                </div>}
                                                {errors.phone?.type === "maxLength" &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    8 numeros
                                                </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Gender</label>
                                                <select className="form-select" {...register("gender")}>
                                                    <option value="Homme">Homme</option>
                                                    <option value="Femme">Femme</option>
                                                </select>
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Photo</label>
                                                <input type="file" id="form2Example11" name="img"
                                                       className="form-control" {...register("img", {required: true})}/>
                                                {errors.img?.type && <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    photo is required
                                                </div>}
                                            </div>
                                        </div>

                                        <div className="formUnit">
                                            <div className="form-outline col-5 mt-5">
                                                <label className="form-label" htmlFor="form3Example90">Birth
                                                    date</label>
                                                <input type="date" id="form3Example90"
                                                       className="form-control form-control-lg" {...register("birthDate", {required: true})} />
                                                {errors.birthDate?.type &&
                                                <div className="d-flex justify-content-center alert alert-danger" style={{opacity:'0.8',padding:'8px',color:'red'}} role="alert">
                                                    birth date is required
                                                </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Type D'utilisateur</label>
                                                <select className="form-select" {...register("isAdmin", {required: true})}>
                                                    <option value="false">Utilisateur</option>
                                                    <option value="true">Admin</option>
                                                </select>
                                            </div>
                                        </div>

<br/>
<br/>
                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit"
                                                >Créer Compte
                                            </button>

                                        </div>

                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                            <div>
                                                <Link to="/auth/login" className="btn btn-outline-success">Vous avez un compte?</Link>
                                            </div>

                                        </div>
                                    </form>
                                </div>

                                {!AuthState?.error && <div className="d-flex justify-content-center alert alert-success" style={{padding:'5px'}} role="alert">
                                    inscription terminée avec succès ! veuillez vous référer à votre boîte de réception pour l'e-mail de confirmation,
                                    <br/>puis connectez-vous <Link to="/auth/login">ici</Link>
                                </div>}
                                {AuthState?.error && <div className="alert alert-warning" role="alert">
                                    {AuthState.error.data}
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;
