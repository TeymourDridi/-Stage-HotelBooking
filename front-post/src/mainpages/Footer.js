import React from "react";

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
const Footer = () => {

    return (<div style={{width:'105.6%'}}>

        <footer className="main-footer style-two" style={{background:"url('/assets/images/background/bg-1.jpg')"}}>
            <div className="auto-container">
                <div className="widget-wrapper">
                    <div className="row d-flex justify-content-md-around">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-logo"><img src="/assets/images/poste-logo.jpg" alt="" style={{opacity:'0.2',width:'40%',borderRadius:'100%'}}/></div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="widget text-widget "><h4> Autres Services</h4>

                                <div class="col-lg-12">
                                    <ul>
                                        <li>
                                            <a href="http://www.e-shop.poste.tn/">Mandat e-dinar</a>
                                        </li>
                                        <li>
                                            <a href="http://www.annuaires.tn/">Tunisie Annuaires</a>
                                        </li>
                                        <li>
                                            <a href="http://www.ctn.com.tn/">La Compagnie Tunisienne de Navigation</a>
                                        </li>
                                        <li>
                                            <a href="http://www.tunisia-stamps.tn/">Collection des Timbres</a>
                                        </li>
                                        </ul>
                                </div>



                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="widget contact-widget"><h4>Contact</h4>

                                <ul>
                                    <li><i className="fal fa-phone"></i><a
                                        href="tel:+216 71 839 000">+216 71 839 000</a></li>
                                    <li><i className="fal fa-envelope"></i><a
                                        href="mailto:info@webmail.com">brc@poste.tn</a></li>
                                    <li><i className="fal fa-map-marker-alt"></i> Rue Hedi Nouira - 1030 Tunis, Tunisie
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>


    </div>)
}


export default Footer;
