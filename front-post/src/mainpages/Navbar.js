import React, {useRef} from "react";
import { Toast } from 'primereact/toast';
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from "react-redux";
import {logout} from "../redux/actions/AuthenticationActions";

const Navbar = (props) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'))

    const logoutHandler = () =>{

        dispatch(logout(props.navigate,props.toast));


    }

    return (<div >


                <header className="main-header header-style-one style-two" id="menunav">
                    <div className="header-top">
                        <div className="auto-container">
                            <div className="wrapper-box box-style-one">
                                <div className="left-column">

                                </div>
                                <div className="right-column box-style-two" >
                                    {user ? <div className="login" onClick={logoutHandler}><a >Déconnexion</a></div> : <div className="login" onClick={(e)=>props.navigate('/auth/signup')}><a >Crée Compte</a></div> }

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="auto-container">
                        <div className="text-center">
                            <div className="logo-box main-logo">
                                <div className="logo"><a ><img src="/assets/images/poste-logo.jpg"
                                                                                alt=""  style={{opacity:'0.65',width:'7%',borderRadius:'20%'}}/></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="header-upper"  >
                        <div className="auto-container" >
                            <div className="inner-container" >
                                <div className="nav-outer" >
                                    <div className="mobile-nav-toggler"><img src="/assets/images/icons/icon-bar.png"
                                                                             alt=""/></div>
                                    <nav className="main-menu navbar-expand-md navbar-light" >
                                        <div className="collapse navbar-collapse show clearfix">
                                            <ul className="navigation">
                                                <li className="dropdown"><Link to={"../home"}>Home</Link>
                                                    {/*<ul>
                                                        <li><a href="index.html">Home One</a></li>
                                                        <li><a href="index-2">Home Two</a></li>
                                                        <li><a href="index-3">Home Three</a></li>
                                                    </ul>*/}
                                                </li>

                                                <li className="dropdown"><Link to={"../hotels"}>Hotels</Link>

                                                </li>

                                                <li><Link to={"../mesreservations"}>Mes Reservations </Link></li>
                                                <li><Link to={"../contact"}>Contact</Link></li>
                                                {user ? user?.isAdmin ? <li><Link to={"../back"}>Admin</Link></li>:null:null}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="right-column">
                                    <div className="search-toggler"><i className="far fa-search"></i></div>
                                    <div className="menu-bar sidemenu-nav-toggler"><img
                                        src="/assets/images/icons/icon-bar3.png" alt=""/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky-header">
                        <div className="header-upper">
                            <div className="auto-container">
                                <div className="inner-container">
                                    <div className="nav-outer">
                                        <div className="mobile-nav-toggler"><img src="/assets/images/icons/icon-bar.png"
                                                                                 alt=""/></div>
                                        <nav className="main-menu navbar-expand-md navbar-light">
                                            <div className="collapse navbar-collapse show clearfix">
                                                <ul className="navigation">
                                                    <li className="dropdown"><Link to={"../home"}>Home</Link>
                                                        {/*<ul>
                                                            <li><a href="index.html">Home One</a></li>
                                                            <li><a href="index-2">Home Two</a></li>
                                                            <li><a href="index-3">Home Three</a></li>
                                                        </ul>*/}
                                                    </li>

                                                    <li className="dropdown"><Link to={"../hotels"}>Hotels</Link>

                                                    </li>

                                                    <li><Link to={"../mesreservations"}>Mes Reservations </Link></li>
                                                    <li><Link to={"../contact"}>Contact</Link></li>

                                                    {user ? user?.isAdmin ? <li><Link to={"../back"}>Admin</Link></li>:null:null}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="right-column">
                                        <div className="search-toggler"><i className="far fa-search"></i></div>
                                        <div className="menu-bar sidemenu-nav-toggler"><img
                                            src="/assets/images/icons/icon-bar3.png" alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-menu">
                        <div className="menu-backdrop"></div>
                        <div className="close-btn"><i className="icon far fa-times"></i></div>
                        <nav className="menu-box">
                            <div className="nav-logo"><a href="index.html"><img src="/assets/images/logo-light.png"
                                                                                alt="" title=""/></a></div>
                            <div className="menu-outer">
                                <div className="collapse navbar-collapse show clearfix">
                                    <ul className="navigation">
                                        <li className="dropdown current"><a href="index.html">Home</a>
                                            <ul style={{display: 'none'}}>
                                                <li><a href="index.html">Home One</a></li>
                                                <li><a href="index-2">Home Two</a></li>
                                                <li><a href="index-3">Home Three</a></li>
                                            </ul>
                                            <div className="dropdown-btn "><span className="fa fa-angle-right"></span>
                                            </div>
                                        </li>
                                        <li><a href="about">About Us </a></li>
                                        <li className="dropdown"><a href="#">Rooms</a>
                                            <ul style={{display: 'none'}}>
                                                <li><a href="room-grid">Room Grid Style</a></li>
                                                <li><a href="room-list">Room List Style</a></li>
                                                <li><a href="room-details">Room Details</a></li>
                                            </ul>
                                            <div className="dropdown-btn "><span className="fa fa-angle-right"></span>
                                            </div>
                                        </li>
                                        <li className="dropdown"><a href="#">Pages</a>
                                            <ul style={{display: 'none'}}>
                                                <li><a href="services">Services</a></li>
                                                <li><a href="restaurant">Restaurant</a></li>
                                                <li><a href="gallery">Gallery</a></li>
                                                <li><a href="offers">Offers</a></li>
                                                <li><a href="menu">Menu</a></li>
                                                <li><a href="places">Places</a></li>
                                            </ul>
                                            <div className="dropdown-btn "><span className="fa fa-angle-right"></span>
                                            </div>
                                        </li>
                                        <li className="dropdown"><a href="#">Blog</a>
                                            <ul style={{display: 'none'}}>
                                                <li><a href="blog">Blog</a></li>
                                                <li><a href="blog-details">Blog Details</a></li>
                                            </ul>
                                            <div className="dropdown-btn "><span className="fa fa-angle-right"></span>
                                            </div>
                                        </li>
                                        <li><a href="contact">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="nav-overlay" style={{display: 'none'}}>
                        <div className="cursor"></div>
                        <div className="cursor-follower"></div>
                    </div>
                </header>
                <section className="hidden-sidebar  close-sidebar" >
                    <div className="wrapper-box">
                        <div className="content-wrapper">
                            <div className="hidden-sidebar-close"><span className="flaticon-remove"></span></div>
                            <div className="about-widget widget">
                                <div className="logo"><img src="/assets/images/logo-light.png" alt=""/></div>
                                <div className="text">We Have Over 40 Payment Ways for Locking the Lowest Room Rates. No
                                    Credit Card Needed! Read Reviews from Verified Guests.
                                </div>
                            </div>
                            <div className="instagram-widget widget"><h4>Instagram Feeds</h4>
                                <div className="inner-box">
                                    <div className="wrapper-box">
                                        <div className="image"><img src="/assets/images/news/news-ins-2.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-3.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-2"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-4.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-3"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-5.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-4"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-6.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-5"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-7.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-6"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-8.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-7"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins-9.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404-8"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                        <div className="image"><img src="/assets/images/news/news-ins.jpg" alt=""/>
                                            <div className="overlay-link"><a href="/assets/images/gallery/404"
                                                                             className="lightbox-image"
                                                                             data-fancybox="gallery"><span
                                                className="fa fa-plus"></span></a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget contact-widget"><h4>Get In Touch</h4>
                                <div className="text">Welcome to Alloggio, where comfort is everything.</div>
                                <ul>
                                    <li><i className="fal fa-phone"></i><a href="tel:90809875769">908-098-757-69</a>
                                    </li>
                                    <li><i className="fal fa-envelope"></i><a
                                        href="mailto:info@webmail.com">info@webmail.com</a></li>
                                    <li><i className="fal fa-map-marker-alt"></i> 13/A, Miranda City Hall, NYC</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="search-popup" className="search-popup ">
                    <div className="close-search theme-btn"><i className="far fa-times"></i></div>
                    <div className="popup-inner">
                        <div className="overlay-layer"></div>
                        <div className="search-form">
                            <form method="post">
                                <div className="form-group">
                                    <fieldset><input id="inputnavh" type="search" className="form-control" name="search-input"
                                                     placeholder="Type &amp; Enter" value=""/></fieldset>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="scroll-to-top scroll-to-target" id="scroll-top" data-target="html"><span
                    className="fas fa-arrow-up"><FontAwesomeIcon icon={faArrowUp} /></span></div>



    </div>)
}


export default Navbar;
