import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">


            <Link to="stats" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Statistique
              </li>
            </Link>

          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/back/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Utilisateurs
              </li>
            </Link>

            <Link to="/back/hotels" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Hotels
              </li>
            </Link>

          </ul>
        </div>


      </div>
    </div>
  );
}
