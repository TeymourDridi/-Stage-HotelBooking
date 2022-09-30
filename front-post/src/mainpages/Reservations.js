import React, {useEffect, useRef, useState} from "react";

import { Toast } from 'primereact/toast';
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {productRows} from "../Backoffice/src/dummyData";
import axios from "axios";
import {DeleteOutline} from "@material-ui/icons";
const Reservations = (props) => {

    const user = JSON.parse(localStorage.getItem('user'))
    let toast = useRef()
    const [data, setData] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/factures/geAll/`+user?._id,{withCredentials:true})
            .then((response) => {
                console.log(response.data);
                for(let i=0 ;i<response.data.length;i++) {
                    response.data[i].id = response.data[i]._id


                }
                setData(response.data)
                setData(response.data)
                console.log("responsegood");


                //console.log(res);


            })
            .catch((e) => {
                console.log(e);
                if(e.response.status===403 || e.response.status===401){
                    props.toast.current.show({severity: 'warn', summary: 'Connectez Vous', detail: "Vous n'etes pas autorisez"});
                    props.navigate('/auth/login')
                }
                console.log("response");
            });


    },[])

    const handleDelete = (id) => {


        axios.delete(`http://localhost:5000/api/factures/`+id,{withCredentials:true})
            .then((response) => {

                console.log("response");

                console.log(response.data);
                toast.current.show({severity: 'success', summary: 'Succès', detail: 'Reservation Supprimer'});
            })
            .catch((e) => {
                console.log(e);
                toast.current.show({severity: 'error', summary: 'Error', detail: e.response.message});
                console.log("response");
            });
        setData(data.filter((item) => item.id !== id));

    };



    const columns = [


        {
            field: "hotelName",
            headerName: "Hotel",
            sortable: true,
            width: 200,


        },
        {
            field: "jours",
            headerName: "Séjour",
            sortable: true,
            width: 200,


        },
        {
            field: "price",
            headerName: "Prix(DT)",
            sortable: true,
            width: 180,


        },
        {
            field: "situation",
            headerName: "Situation",
            sortable: true,
            width: 181,
        },



        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>

                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];










    return (<div>
        <Toast ref={toast} position="bottom-left" />
        <section className="page-title" style={{backgroundImage:"url('/assets/images/main-slider/about.jpg')"}}>
            <div className="auto-container">
                <div className="content-box">
                    <div className="content-wrapper">
                        <ul className="bread-crumb">
                            <li><a>Home</a></li>

                            <li>Mes Reservation</li>
                        </ul>
                        <div className="title"><h1>Mes Reservation</h1></div>
                    </div>
                </div>
            </div>
        </section>
<br/>
    <div style={{width:'80%',margin:'auto'}} className="d-flex justify-content-center" >
        <DataGrid
            rows={data}
            disableSelectionOnClick
autoHeight={true}

            components={{Toolbar: GridToolbar}}
            columns={columns}
            pageSize={8}


        />
    </div>
        <br/><br/>
    </div>)
}


export default Reservations;
