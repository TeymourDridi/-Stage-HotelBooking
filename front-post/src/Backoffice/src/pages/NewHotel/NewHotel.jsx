import React, {useEffect, useRef, useState} from "react";
import "./newHotel.css";
import {Link} from "react-router-dom";
import { Toast } from 'primereact/toast';
import Select, { StylesConfig }  from 'react-select'
import {publicRequest} from "../../../../Requests/requestMethods";
import {useForm} from "react-hook-form";
import makeAnimated from 'react-select/animated';



let val=false

 const NewHotel=(props)=> {
     let toast = useRef()
     const {register, handleSubmit,control, formState:{errors}}= useForm();
  const [n,setN]=useState(1)

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [city,setCity]=useState("")
  const [address,setAddress]=useState("")
  const [rating,setRating]=useState("")
  const [discount,setDiscount]=useState("")
  const [description,setDescription]=useState("")
  const [additional,setAdditional]=useState([])
  const [photos,setPhotos]=useState([])

  let [rooms,setRooms]=useState([])
  let [bname,setBname]=useState([])
  let [bvidLink,setBvidLink]=useState([])
  let [bprice,setBprice]=useState([])
  let [bmax,setBmax]=useState([])

     const[valid,setValid]=useState(false)

let x=0;

     const options = [
         { value: 'Service de blanchisserie', label: 'Service de blanchisserie' },
         { value: 'Nourriture et collations', label: 'Nourriture et collations' },
         { value: 'Prise en charge à l aéroport', label: 'Prise en charge à l\'aéroport' },
         { value: 'Piscine Chauffé', label: 'Piscine Chauffé' },
         { value: 'Spa', label: 'Spa' },
         { value: 'Wifi Gratuit', label: 'Wifi Gratuit' },
         { value: 'Gym', label: 'Gym' },
         { value: 'Zone Jeux', label: 'Zone Jeux' },
     ]


     const submit = (data)=>{

         var formData = new FormData();
         Array.from(data.photos).map((f)=>{
         formData.append("photos",f);
});

         console.log(data.photos['0'])
      if(val) {
          for (let i = 0; i < bname.length; i++) {
              rooms.push({title: bname[i], number: bvidLink[i], price: bprice[i],maxPeople:bmax[i]})


          }

let add=[]
          for(let a of additional){
              add.push(a.label);
          }

console.log(add)
          publicRequest.post('/hotels/', {
              name: name,
              city: city,
              email:email,
              address:address,
              rooms: rooms,
              description:description,
              rating:Number(rating),
              discount:Number(discount),
              photos:photos,
              additional:add
          },{withCredentials:true})
              .then((response) => {
                  let hotid=response.data._id;

                  publicRequest.post('/hotels/photos/'+ hotid,formData ,{withCredentials:true})
                      .then((response) => {
                          console.log(response);
                          toast.current.show({severity: 'success', summary: 'Succès', detail: name+' Ajouter'});
                      })
                      .catch((e) => {
                          toast.current.show({severity: 'error', summary: 'Error', detail: e.response.data});

                      })





              })
              .catch((e) => {
                  toast.current.show({severity: 'error', summary: 'Error', detail: e.response.data});
                  if(e.response.status===403 || e.response.status===401){
                      props.navigate('/auth/login')
                  }
              })
      }
  }

  const submitUpdate = (data)=>{
      var formData = new FormData();
      Array.from(data.photos).map((f)=> {
          formData.append("photos", f)
      });
      if(val) {
          for (let i = 0; i < bname.length; i++) {
              rooms.push({title: bname[i], number: bvidLink[i], price: bprice[i],maxPeople:bmax[i]})


          }

          let add=[]
          for(let a of additional){
              add.push(a.label);
          }

          publicRequest.put('/hotels/'+props.upid, {
              _id: props.upid,
              name: name,
              city: city,
              email:email,
              address:address,
              rooms: rooms,
              description:description,
              rating:Number(rating),
              discount:Number(discount),
              additional:add

          },{withCredentials:true})
              .then((response) => {
                  let hotid=response.data._id;
                  publicRequest.post('/hotels/photos/'+ hotid,formData ,{withCredentials:true})
                      .then((response) => {
                          toast.current.show({severity: 'success', summary: 'Succès', detail: name+' Modifier'});
                      })
                      .catch((e) => {
                          toast.current.show({severity: 'error', summary: 'Erreur', detail: e.response.data});
                      })

              })
              .catch((e) => {

                  if(e.response.status===403 || e.response.status===401){
                      props.navigate('/auth/login')
                  }
                  toast.current.show({severity: 'error', summary: 'Error', detail: e.response.data});
              })
      }
  }
const beginputs= (n)=>{

  return (
      [...Array(n)].map((e, i) =>
      <div className="addProductItem form-outline block-43">
    <span style={{margin:'auto'}}><b> Type {i+1}</b></span> <input type="text" defaultValue={bname[i]} onChange={(e)=> {bname[i] = e.target.value;setValid(!valid)}} placeholder="Type" />
          {bname[i] ? bname[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {bname[i]? bname[i].replaceAll(" ","").length<4 && bname[i].replaceAll(" ","").length>=1? validationname(false) :validationname(true):null}

          <span><b>  Combien de chambres  {bname[i]}</b></span><input type="number" defaultValue={bvidLink[i]} onChange={(e)=>{bvidLink[i] = e.target.value;setValid(!valid)}} placeholder="Number" />
          {bvidLink[i] ? bvidLink[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {/*{bvidLink[i] ? bvidLink[i].replaceAll(" ","").length>=1 && ( bvidLink[i].replaceAll(" ","").length<15 ) ? validationlink(false) :validationlink(true):null}*/}

          <span><b> Prix Chambre {bname[i]}</b></span><input type="number" defaultValue={bprice[i]} onChange={(e)=>{bprice[i] = e.target.value;setValid(!valid)}} placeholder="Price" />
          {bprice[i] ? bprice[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {/*{bvidLink[i] ? bvidLink[i].replaceAll(" ","").length>=1 && ( bvidLink[i].replaceAll(" ","").length<15 ) ? validationlink(false) :validationlink(true):null}*/}

          <span><b> Maximum Personne Par Chambre {bname[i]}</b></span><input type="number" defaultValue={bmax[i]} onChange={(e)=>{bmax[i] = e.target.value;setValid(!valid);console.log(bmax[i])}} placeholder="Maximum" />
          {bmax[i] ? bmax[i].replaceAll(" ","").length<1 ? validation(false) :validation(true):validation(false)}
          {/*{bvidLink[i] ? bvidLink[i].replaceAll(" ","").length>=1 && ( bvidLink[i].replaceAll(" ","").length<15 ) ? validationlink(false) :validationlink(true):null}*/}

      </div>))
}





function validation(st){
      if(st===true && x===0) {
          val = st;
      }
      if(st===false) {
          val = st;
          x=x+1
          return (
              <span style={{color:'red'}}>Obligatoire *</span>)
      }else{return null}
}
function validationname(st){
      if(st===true && x===0) {
          val = st;
      }
      if(st===false) {
          val = st;
          x=x+1
          return (
              <span>Au moins 4 character</span>)
      }else{return null}
}
     function validationlink(st,price){
         if(st===true && x===0) {
             val = st;
         }
         if(st===false && price!=="prix") {
             val = st;
             x=x+1
             return (
                 <span>Lien valide</span>)
         }else if(st===false && price==="prix") {
             val = st;
             x=x+1
             return (
                 <span>Enter a Valid price with the correct currency</span>)
         }else{return null}

     }


     //update


     useEffect(()=>{

            if(props.uprooms){
                let b=0;
let titleTab=[];
                props.uprooms.map(t=>{

                    if (!titleTab.includes(t?.title)){
                        b=b+1
                        titleTab.push(t?.title);
                        let numberrooms=0;
                        for(let r of props.uprooms){
                            if(r.title===t?.title){
                                numberrooms+=1;
                            }
                        }
                        bname.push(t?.title);
                        bvidLink.push(numberrooms.toString());
                        bprice.push(t.price.toString());
                        bmax.push(Number(t?.maxPeople).toString());
                    }









                })
                if (b>1){setN(b)}
            }



            setTimeout(()=> {
                if (props.upname) {
                    setName(props.upname)
                }
                if (props.upcity) {
                    setCity(props.upcity)
                }
                if (props.updescription) {
                    setDescription(props.updescription)
                }
                if (props.upemail) {
                    setEmail(props.upemail)
                } if (props.upaddress) {
                    setAddress(props.upaddress)
                } if (props.uprating) {
                    setRating(props.uprating.toString())
                } if (props.updiscount) {
                    setDiscount(props.updiscount.toString())
                }

            },1000)
         setValid(!valid)

     },[props.uprooms])


         return (
             <div style={{padding:'40px'}} className="newProduct">
                 <Toast ref={toast} position="bottom-left" />
                 <h1 className="addProductTitle text-center">{name ? name.charAt(0).toUpperCase() + name.substr(1,name.length) :"Nouveau"} Hotel</h1>
                 <div className="addProductForm">

                     <form  onSubmit={props.upname ? handleSubmit(submitUpdate):handleSubmit(submit)}>
                     <div className="formUnit mt-5">
                            <div className="addProductItem form-outline col-5 mb-4">
                            <label className="form-label">Nom</label>
                            <input className="form-control" type="text" name="requiredField" defaultValue={props.upname}  onChange={(e) => setName(e.target.value)} placeholder="Hotel Name"/>

                            {name.replaceAll(" ","").length<1 ? validation(false) :validation(true)}
                            {name.replaceAll(" ","").length<4 && name.replaceAll(" ","").length>=1? validationname(false) :validationname(true)}
                        </div>


                     <div className="addProductItem form-outline col-5 mb-4">
                         <label className="form-label">Gouvernat</label>
                         <select className="form-select" onChange={(e) => setCity(e.target.value)}>
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
                    </div>

                    <div className="formUnit mt-5">
                         <div className="addProductItem form-outline col-5 mb-4">
                         <label className="form-label">Email</label>
                         <input className="form-control" type="email" defaultValue={props.upemail} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                         {email.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                         {/*{ email.replaceAll(" ","").length<1 ? null: !email.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)\s?($|\$)/) ? validationlink(false,"email") :validationlink(true,"email")}*/}

                     </div>

                        <div className="addCourseDesc form-outline col-5 mb-4">
                         <label className="form-label">Adresse</label>
                         <input className="form-control" type="textarea" defaultValue={props.upaddress} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse"/>
                         {address.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                        {address.replaceAll(" ","").length<4 && address.replaceAll(" ","").length>=1? validationname(false) :validationname(true)}

                     </div>
                    </div>

                     <div className="formUnit mt-5">

                         <div className="form-outline col-5 mb-4">
                             <label className="form-label" htmlFor="form2Example11">Photos</label>
                             <input type="file" id="form2Example11" name="photos"
                                    className="form-control" multiple onChange={(e) => setPhotos(e.target.files)}
                                    {...register("photos",{
                                        required: true
                                    })}
                             />
                         </div>

                     <div className="addCourseDesc form-outline col-5 mb-4">
                         <label className="form-label">Description</label>
                         <input className="form-control" type="textarea" defaultValue={props.updescription} onChange={(e) => setDescription(e.target.value)} placeholder="description"/>
                         {description.replaceAll(" ","").length<1 ?   validation(false) :validation(true)}
                        {description.replaceAll(" ","").length<4 && description.replaceAll(" ","").length>=1? validationname(false) :validationname(true)}

                     </div>

                     </div>

                   <div className="formUnit mt-5">
                     <div className="addCourseDesc form-outline col-5 mb-4">
                         <label className="form-label">Etoile</label>
                         <select className="form-select"  onChange={(e) => setRating(e.target.value)} >
                             {props.uprating===0 ? <option value="0" selected>0</option>:<option value="0">0</option>}
                             {props.uprating===1 ? <option value="1" selected>1</option>:<option value="1">1</option>}
                             {props.uprating===2 ? <option value="2" selected>2</option>:<option value="2">2</option>}
                             {props.uprating===3 ? <option value="3" selected>3</option>:<option value="3" >3</option>}
                             {props.uprating===4 ? <option value="4" selected>4</option>:<option value="4">4</option>}
                             {props.uprating===5 ? <option value="5" selected>5</option>:<option value="5">5</option>}


                         </select>
                     </div>
                     <div className="addCourseDesc form-outline col-5 mb-4">
                         <label className="form-label">Services Additionel</label>
                         <Select className="basic-multi-select" closeMenuOnSelect={false} options={options}  isMulti onChange={(e) => setAdditional(e)} >


                         </Select>
                     </div>
                   </div>

                   <div className="formUnit mt-5">
                     <div className="addProductItem form-outline col-5 mb-4">
                         <label className="form-label">Remise</label>
                         <input className="form-control" type="number" name="requiredField" defaultValue={props.updiscount}  onChange={(e) => setDiscount(e.target.value)} placeholder="%"/>

                         {discount.replaceAll(" ","").length>2 ? validation(false) :validation(true)}


                     </div>

                     <div className="addProductItem form-outline col-5 mb-4">
                         <label className="form-label">Chambres</label>

                         {beginputs(n)}

                         <button type="button" className="btn btn-dark fa fa-plus d-flex justify-content-center" style={{width: '10%',margin:'auto'}} onClick={(e) => {
                             setN(n+1);

                         }}>
                         </button>

                     </div>
                   </div>


<div className="col-8 d-flex justify-content-between mt-5">
    <Link type="button" className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3 col-4" to={'../hotels'} >Retour</Link>

    {props.upname ?


        <button className="addCourseButtonT" disabled={!val} onClick={(e) => {
        handleSubmit(submitUpdate)
        }}>Mise à Jour</button>
    :
    <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3 col-5" disabled={!val} onClick={(e) => {
        handleSubmit(submit)
    }}>Crée</button>
}

</div>

</form>

</div>
             </div>
         );

}
export default NewHotel;
