import React from "react";

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
const Hotelgrid = (props) => {


    return (


                    <div className="row" style={{width:'80%',margin:'auto'}}>
                        <div className="col-lg-4">
                            <div className="image"><img style={{width:'470px',maxWidth:'200px',minWidth:'370px',height:'263px'}} src={'http://localhost:5000/api/hotels/p/'+props.data?.photos[0]} alt=""/></div>
                        </div>
                        <div className="col-lg-8">
                            <div className="block-thirty-eight">
                                <div className="icon-list">
                                    <ul>
                                        <li><i className="flaticon-user d-flex justify-content-center"></i><h4>Chambres</h4>
                                            <div className="text d-flex justify-content-center">{props.data.rooms.length}</div>
                                        </li>
                                        <li><i className="flaticon-preview d-flex justify-content-center"></i><h4>Gouvernorat</h4>
                                            <div className="text d-flex justify-content-center">{props.data.city}</div>
                                        </li>
                                        <li><i className="flaticon-view d-flex justify-content-center"></i><h4>Etoile</h4>
                                            <div className="text d-flex justify-content-center">{props.data.rating}</div>
                                        </li>
                                    </ul>
                                </div>
                                <h3>{props.data.name}</h3>
                                <div className="text-two">{props.data.description}
                                </div>
                                <div className="inner-box">
                                    { props.data.discount ? <div className="pricing" style={{bottom:'78px'}}><span>Remise</span><span> {props.data.discount}%</span> </div> : null}
                                    <Link className="theme-btn btn-style-four"
                                       to={"../hotels/reserver/" + props.data._id}><span>Voir Hotel</span></Link></div>
                            </div>
                        </div>
                    </div>


)
}


export default Hotelgrid;
