import React from "react";
import './Contact.css';
import './Contact.scss';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
const Contact = () => {

    return (<section className="ftco-section" id="bodcontact">
        <div className="container">
            <div className="row justify-content-center">

            </div>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    <div className="wrapper">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 mb-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="dbox w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-map-marker"></span>
                                            </div>
                                            <div className="text">
                                                <p><span>Address:</span> Rue Hedi Nouira - 1030 Tunis, Tunisie</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="dbox w-100 text-center">
                                          <a href="tel:+216 71 839 000" > <div className="icon d-flex align-items-center justify-content-center" href="tel:71356566">
                                                <span className="fa fa-phone"  ></span>

                                            </div></a>
                                            <div className="text">
                                                <p><span>Telephone:</span>
                                                    <a href="tel:+216 71 839 000" title="Appelez-nous"
                                                       >
                                                        <span className="ml-2 mt-1"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M7.85707 8.7143C8.13395 7.95917 9.24145 7.95917 9.96133 7.41979C10.1828 7.25797 10.4043 7.04222 10.4043 6.71859C10.2936 5.63983 9.90595 3.85988 9.51833 3.15868C9.40758 2.94293 9.24145 2.78112 8.9092 2.78112C7.91244 2.6193 6.14044 3.42837 5.86356 3.80594C1.48891 8.98399 9.3522 21.2279 16.0526 19.7177C16.4956 19.6098 18.0461 18.3692 18.3784 17.4523C18.4337 17.1826 18.3784 16.9129 18.2676 16.7511C17.7692 16.1038 16.2741 14.9711 15.3327 14.4317C15.0559 14.2699 14.779 14.3778 14.5021 14.4857C13.6715 14.9172 13.2285 15.8881 12.3978 15.7802C10.8473 15.5644 7.35869 10.1706 7.85707 8.7143Z"
                                                                  fill="#4385F5"></path>
                                                        </svg>+216 71 839 000</span>
                                                    </a>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="dbox w-100 text-center">
                                            <a href="mailto:brc@poste.tn">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-paper-plane"></span>
                                            </div></a>
                                            <div className="text">
                                                <p><span>Email:</span> <a
                                                    href="mailto:brc@poste.tn"><span>brc@poste.tn</span></a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}


export default Contact;
