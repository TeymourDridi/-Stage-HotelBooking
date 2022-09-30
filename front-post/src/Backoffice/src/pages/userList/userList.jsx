import React, {useEffect, useRef} from "react";
import "./userList.css";
import { Toast } from 'primereact/toast';
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {productRows, userRows} from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UserList() {
  const [data, setData] = useState(productRows);
  let toast = useRef()

  useEffect((props)=>{
    axios.get(`http://localhost:5000/api/users`,{withCredentials:true})
        .then((response) => {
          console.log(response.data);

          for(let i=0 ;i<response.data.length;i++) {
            response.data[i].id = response.data[i]._id
            response.data[i].factures = response.data[i].factures.length;
            if(response.data[i].verified) {
                response.data[i].verified = "Oui";
            }else{response.data[i].verified = "Non";}            //response.data[i].img= response.data[i].img[0];

          }
          setData(response.data)
          console.log("responsegood");
          //console.log(res);


        })
        .catch((e) => {
          console.log(e);
          if(e.response.status===403 || e.response.status===401){
            props.navigate('/auth/login')
          }
          console.log("response");
        });


  },[])

  const handleDelete = (id) => {


    axios.delete(`http://localhost:5000/api/users/`+id,{withCredentials:true})
        .then((response) => {


          toast.current.show({severity: 'success', summary: 'Succès', detail: 'Utilisateur Supprimer'});


        })
        .catch((e) => {
          toast.current.show({severity: 'error', summary: 'Erreur', detail: e.response.message});
        });
    setData(data.filter((item) => item.id !== id));

  };



  const columns = [

    {
      field: "img",
      headerName: "Image",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
            <div className="productListItem">

              <img className="productListImg"  src={'http://localhost:5000/api/users/p/'+params.row.img} alt="" />

            </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Nom D'utilisateur",
      sortable: true,
      width: 200,


    },
    {
      field: "name",
      headerName: "Nom",
      sortable: true,
      width: 200,


    },
    {
      field: "lastname",
      headerName: "Prenom",
      sortable: true,
      width: 180,


    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 181,
    },
    {
      field: "city",
      headerName: "Gouvernat",
      sortable: true,
      width: 179,

    },
    {
      field: "phone",
      headerName: "Telephone",
      sortable: true,
      width: 180,

    },{
      field: "verified",
      headerName: "Verifier",
      sortable: true,
      width: 180,

    },{
      field: "factures",
      headerName: "Reservations",
      sortable: true,
      width: 180,

    },


    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
            <>
            {/*  <Link to={"../hotel/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>*/}
              <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
              />
            </>
        );
      },
    },
  ];

  return (
      <div className="productList">
        <Toast ref={toast} position="bottom-left" />

        <DataGrid
            rows={data}
            disableSelectionOnClick

            components={{Toolbar: GridToolbar}}
            columns={columns}
            pageSize={8}


        />
      </div>
  );
}
