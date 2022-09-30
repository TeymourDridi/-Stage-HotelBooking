import React from "react";
import "./TopBar.css";
import {Link} from "react-router-dom";
import {NotificationsNone, Settings} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {logout} from "../../../../redux/actions/AuthenticationActions";
//import {NotificationsNone, Settings} from '@mui/icons-material';

const TopBar = (props) =>{
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'))

    const logoutHandler = () =>{

        dispatch(logout(props.navigate));


    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="logo">



                    <Link to="/">
                        <img className="topbarImage" src="/assets/images/poste-logo.jpg" alt=""/>
                        <span style={{'margin-left':'20px','text-decoration':'none'}}>Retour a l'interface client</span>
                    </Link>
                </div>

                <div className="topRight">
                    <div className="TopbarNotification">
                        <NotificationsNone/>
                        <span className="notifBadge">0</span>
                    </div>

                    <div className="TopbarSettings">
                        <Settings/>
                    </div>
                    <div className="TopbarSettings" onClick={logoutHandler}>
                        Déconnexion
                    </div>

                    <div>
                        {/*change this one to dynamic user profile picture*/}
                        <img className="topbarImage" src="/assets/images/poste-logo.jpg" alt=""/>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default TopBar
