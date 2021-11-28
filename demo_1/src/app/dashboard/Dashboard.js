import instance from '../axios-orders'
import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';

function ChartJs() {

  useEffect(() => {
    getData()
    getDaily()
    getWeeklySailes()
    checkOffers()
  }, [])

  const [COD, setCOD] = useState()
  const [paypal, setPaypal] = useState()
  const [razorpay, setRazorpay] = useState()

  const checkOffers=()=>{
    
  }

 

  const getData = () => {
    instance.get('/getDataToDashbord').then((res) => {
      setCOD(res.data.COD)
      setPaypal(res.data.paypal)
      setRazorpay(res.data.razorpay)
    })
  }

  const [dailyReport, setDailyReport] = useState([])

  const getDaily = () => {
    instance.get('/getDataofDaily').then((res) => {
      setDailyReport(res.data)
    })
  }

  const [dailyAmount, setDailyAmount] = useState([])

  const getWeeklySailes = () => {
    instance.get('/getWeeklySailes').then((res) => {
      setDailyAmount(res.data)
    })
  }
  
  // first chart...
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data = {
    labels: [days[(new Date().getDay()) % 7], days[(new Date().getDay() + 1) % 7], days[(new Date().getDay() + 2) % 7], days[(new Date().getDay() + 3) % 7], days[(new Date().getDay() + 4) % 7], days[(new Date().getDay() + 5) % 7], days[(new Date().getDay() + 6) % 7], days[(new Date().getDay())]],
    datasets: [{
      label: 'Daily orders ',
      data: dailyReport,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(115, 200, 34, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(321, 472, 35, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1,
      fill: false
    }]
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  // End
  // Second Chart 

  const areaData = {
    labels: [days[(new Date().getDay()) % 7], days[(new Date().getDay() + 1) % 7], days[(new Date().getDay() + 2) % 7], days[(new Date().getDay() + 3) % 7], days[(new Date().getDay() + 4) % 7], days[(new Date().getDay() + 5) % 7], days[(new Date().getDay() + 6) % 7], days[(new Date().getDay())]],
    datasets: [{
      label: '# Revenue',
      data: dailyAmount,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true, // 3: no fill
    }]
  };

  const areaOptions = {
    plugins: {
      filler: {
        propagate: true
      }
    },
    scales: {
      yAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    }
  }

  








  const doughnutPieData = {
    datasets: [{
      data: [paypal, COD, razorpay],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Paypal',
      'COD',
      'Razorpay',
    ]
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const scatterChartData = {
    datasets: [{
      label: 'First Dataset',
      data: [{
        x: -10,
        y: 0
      },
      {
        x: 0,
        y: 3
      },
      {
        x: -25,
        y: 5
      },
      {
        x: 40,
        y: 5
      }
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)'
      ],
      borderWidth: 1
    },
    {
      label: 'Second Dataset',
      data: [{
        x: 10,
        y: 5
      },
      {
        x: 20,
        y: -30
      },
      {
        x: -25,
        y: 15
      },
      {
        x: -10,
        y: 5
      }
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }
    ]
  }

  const scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    }
  }


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          YourOwn Reports
        </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          </ol>
        </nav>
      </div>
      <div className="row">


        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Daily Orders</h4>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>


        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sales Revenue</h4>
              <Line data={areaData} options={areaOptions} />
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Payment Report</h4>
              <Doughnut data={doughnutPieData} options={doughnutPieOptions} />
            </div>
          </div>
        </div>


        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Scatter Chart</h4>
              <Scatter data={areaData} options={areaOptions} />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}


export default ChartJs
