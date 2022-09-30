import {Link} from "react-router-dom";
import React from "react";


const Footer = () => {

    return (<div>

            <footer className="site-footer ">

                <div className="footer-Block">
                    <div className="footerLogo">
                        <Link to="/"> <img src="/assets/images/poste-logo.jpg" alt=""/></Link>
                    </div>

                    <div className="widget nav-widget">
                        <h4 className="widget-title">Support</h4>
                        <ul>
                            <li><a href="about">Privacy Policy</a></li>
                            <li><a href="faq">Faq &amp; Terms</a></li>
                            <li><a href="contact">Contact</a></li>
                        </ul>
                    </div>


                    <div className="widget contact-widget">
                        <h4 className="widget-title">Contact</h4>
                        <ul className="info-list">
                            <li>

                                <span className="icon"><i className="far fa-phone"></i></span>

                                <span className="info">

                                    <span className="info-title">Telephone : </span><a href="tel:+216 71 839 000"><svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                  d="M7.85707 8.7143C8.13395 7.95917 9.24145 7.95917 9.96133 7.41979C10.1828 7.25797 10.4043 7.04222 10.4043 6.71859C10.2936 5.63983 9.90595 3.85988 9.51833 3.15868C9.40758 2.94293 9.24145 2.78112 8.9092 2.78112C7.91244 2.6193 6.14044 3.42837 5.86356 3.80594C1.48891 8.98399 9.3522 21.2279 16.0526 19.7177C16.4956 19.6098 18.0461 18.3692 18.3784 17.4523C18.4337 17.1826 18.3784 16.9129 18.2676 16.7511C17.7692 16.1038 16.2741 14.9711 15.3327 14.4317C15.0559 14.2699 14.779 14.3778 14.5021 14.4857C13.6715 14.9172 13.2285 15.8881 12.3978 15.7802C10.8473 15.5644 7.35869 10.1706 7.85707 8.7143Z"
                                                                  fill="#4385F5"></path>
                                                        </svg>+216 71 839 000</a></span>
                            </li>

                            <li>
                                <span className="icon"><i className="far fa-map-marker-alt"></i></span>

                                <span className="info"><span className="info-title">Location : </span><a href="mailto:brc@poste.tn">Rue Hedi Nouira - 1030 Tunis, Tunisie</a></span>
                            </li>
                        </ul>
                    </div>
                </div>


                    <div className="copyright-area">

                            <p className="copyright-text">© 2000-2022 <span> </span><a href="/">La Poste Tunisienne</a>. Tous Droit Reserver</p>

                    </div>


            </footer>
        </div>
    )
}


export default Footer
