import React, {useEffect} from "react";
import "./HotelList.css";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {publicRequest} from "../../../../Requests/requestMethods";
export default function HotelList(props) {
  const [data, setData] = useState(productRows);


  useEffect(()=>{
      axios.get(`http://localhost:5000/api/hotels`,{withCredentials:true})
          .then((response) => {
              for(let i=0 ;i<response.data.length;i++) {
                  response.data[i].id = response.data[i]._id
                  response.data[i].photos= response.data[i].photos[0];

              }
              setData(response.data)
              console.log("responsegood");
              //console.log(res);
              console.log(response.data);

          })
          .catch((e) => {
              console.log(e);
              if(e.response.status===403){
                  props.navigate('/auth/login')
              }
              console.log("response");
          });


  },[])

  const handleDelete = (id) => {


      axios.delete(`http://localhost:5000/api/hotels/`+id,{withCredentials:true})
          .then((response) => {

              console.log("response");

              console.log(response.data);

          })
          .catch((e) => {
              console.log(e);
              console.log("response");
          });
      setData(data.filter((item) => item.id !== id));

  };



  const columns = [

    {
      field: "photos",
      headerName: "Image",
      width: 100,
        sortable: false,
      renderCell: (params) => {
        return (
          <div className="productListItem">

            <img className="productListImg"  src={'http://localhost:5000/api/hotels/p/'+params.row.photos} alt="" />

          </div>
        );
      },
    },
      {
      field: "name",
      headerName: "Hotel",
          sortable: true,
      width: 200,


    },
{
      field: "description",
      headerName: "Description",
          sortable: true,
      width: 200,


    },
{
      field: "email",
      headerName: "Email",
          sortable: true,
      width: 180,


    },
{
      field: "address",
      headerName: "Adresse",
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
      field: "rating",
      headerName: "Etoile",
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
            <Link to={"../hotel/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
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
      <Link to="../../back/newhotel">
        <button className="productAddButton">Create</button>
      </Link>

      <DataGrid
        rows={data}
        disableSelectionOnClick

        components={{Toolbar: GridToolbar}}
        columns={columns}
        pageSize={8}
        checkboxSelection

      />
    </div>
  );
}
