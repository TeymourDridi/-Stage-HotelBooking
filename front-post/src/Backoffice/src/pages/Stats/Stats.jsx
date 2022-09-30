import React from "react";
import "./Stats.css";
import 'chart.js/auto';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,

  },
  paperElements: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary
  },
  paperHeader: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: '25px',
    fontWeight: 'bold'
  },
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
export default function Stats(props) {
  const [stats, setstats] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect( () => {
     fetchData();
  }, []);
  async function fetchData() {
    let arr = [];
    let res = await axios.get("http://localhost:5000/api/factures/stats",{withCredentials:true})
        .then((response) => {

            setIsLoaded(true);
            setstats(response.data);
            console.log(response);
            console.log("response");

        })
        .catch((e) => {
            setIsLoaded(true);
            setError(error);
            console.log(e);
            if(e.response.status===403){
                props.navigate('/auth/login')
            }
            console.log("response");
        });


  }
  const classes = useStyles();
  const drawChart = (stats) => {
    console.log(stats)
    const data =  {
      labels: stats.map((s)=>s.name),
      datasets: [{
          label: '# of Votes',
          data: stats.map((s)=>s.reservations),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }
  return data;
  };

  return (
    <div className="productList" >
       <Paper className={classes.paper} >
                  <h4 class="card-title mb-0">Reservation Par Hotel</h4>
           <br/>
                  <Pie data={drawChart(stats)} />
                  </Paper>

    </div>
  );
}
