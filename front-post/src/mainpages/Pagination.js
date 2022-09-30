import React, {useEffect, useRef, useState} from "react";
import './Pagination.css';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {productRows} from "../Backoffice/src/dummyData";
import axios from "axios";
import Hotelgrid from "./Hotelgrid";
let dataLimit=7;
const Pagination = (props) => {
    const [data, setData] = useState([]);
    const [nom, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [city, setCity] = useState(null);
    const [rating, setRating] = useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/hotels`,{withCredentials:true})
            .then((response) => {

                setData(response.data)
                console.log("responsegood");
                //console.log(res);
                console.log(response.data);

            })
            .catch((e) => {
                console.log(e);
                if(e.response.status===403){
                    props.toast.current.show({severity: 'warn', summary: 'Connectez Vous', detail: "Vous n'etes pas autorisez"});
                    props.navigate('/auth/login')

                }
                console.log("response");
            });


    },[])

    function submit(name2,price2,discount2,rating2){

console.log(name2);

    }
    useEffect(()=>{
        let name2=nom;
        let price2=price;
        let city2=city;
        let rating2=rating;

        if(nom===''){
           name2='null';
        } if(price===''){
            price2='null';
        } if(city===''){
            city2='null';
        } if(rating===''){
            rating2='null';
        }
        axios.get(`http://localhost:5000/api/hotels/search/`+name2+"/"+price2+"/"+city2+"/"+rating2,{withCredentials:true})
            .then((response) => {

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


    },[nom,price,city,rating])


    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
    const scroll=useRef();

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
        scroll.current.scrollIntoView({ behavior: 'smooth' })
       // window.scrollTo('#hotscroll')
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let pageLimit=Math.ceil(data.length / dataLimit);
        if(pageLimit>4){
            pageLimit=4;
        }
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };


    return (<div>

        <section className="page-title" style={{backgroundImage:"url('/assets/images/main-slider/about.jpg')"}} >
            <div className="auto-container">
                <div className="content-box">
                    <div className="content-wrapper">
                        <ul className="bread-crumb">
                            <li><a href="index.html">Home</a></li>
                            <li>Hotels</li>
                        </ul>
                        <div className="title" ><h1 id="hotscroll" ref={scroll} >Hotels</h1></div>
                    </div>
                </div>
            </div>
        </section>


        <div className="s009">
            <form>
                <div className="inner-form">
                    <div className="basic-search">
                        <div className="input-field">
                            <input id="search" type="text" placeholder="Nom Hotel" onChange={(e)=>setName(e.target.value)}/>
                            <div className="icon-wrap">
                                <svg className="svg-inline--fa fa-search fa-w-16" fill="#ccc" aria-hidden="true"
                                     data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path
                                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="advance-search">
                        <span className="desc">RECHERCHE AVANCE</span>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-select">
                                    <select className="form-select" data-trigger="" name="choices-single-defaul" onChange={(e)=>setPrice(e.target.value)}>
                                        <option placeholder="" value="">Prix</option>
                                        <option value="-1">Plus Cher</option>
                                        <option value="1">Moins Cher</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-field">
                                <div className="input-select">
                                    <select className="form-select" data-trigger="" name="choices-single-defaul" onChange={(e)=>setCity(e.target.value)}>
                                        <option placeholder="" value="">Gouvernat</option>
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
                            <div className="input-field">
                                <div className="input-select">
                                    <select className="form-select" data-trigger="" name="choices-single-defaul" onChange={(e)=>setRating(e.target.value)}>
                                        <option placeholder="" value="">Etoile</option>
                                        <option value="0" >0</option>
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                        <option value="3" >3</option>
                                        <option value="4" >4</option>
                                        <option value="5" >5</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row third">
                            <div className="input-field">
                                <div className="result-count">
                                    <span>{data.length} </span>resultats
                                </div>
                                <div className="group-btn">
                                    <button type="reset" className="btn-delete" id="delete" onClick={()=>{setName(null);setPrice(null);setRating(null);setCity(null)}}>RESET</button>
                                    <button type="button" className="btn-search">SEARCH</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>





        <section className="section-thirty-eight" >

            <div className="auto-container">

        <div className="dataContainer" >
            {getPaginatedData().map((d, idx) => (
                <Hotelgrid key={idx} data={d} />
            ))}
        </div>
            </div>
        </section>



        {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
        <div className="pagination">
            {/* previous button */}
            <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
                Précedent
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                >
                    <span>{item}</span>
                </button>
            ))}

            {/* next button */}
            <button
                onClick={goToNextPage}
                className={`next ${currentPage === Math.ceil(data.length / dataLimit) ? 'disabled' : ''}`}
            >
                Suivant
            </button>


</div>


    </div>)
}


export default Pagination;
