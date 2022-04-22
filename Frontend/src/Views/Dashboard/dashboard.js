import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { MdOutlineProductionQuantityLimits, MdDashboard } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { useEffect } from 'react';
import { getDashBoardData } from '../../services/dashboardService';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SideBar from './SideBar';
import ProtectedRoute from '../ProtectedRoute';
import { useDispatch } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch()
  let { path, url } = useRouteMatch();

  const Months = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    let labels = [];
    let data = [];

    const salesData = dashboardData?.salesData?.forEach(
      ({ _id: date, total }) => {
        let [year, monthPosition, day] = date.split('-');
        const monthIndex = parseInt(monthPosition) - 1;
        const month = Months[monthIndex];

        labels.push(`${month} ${day}`);
        data.push(total);
      }
    );

    setGraphData({ labels, data });

  }, [dashboardData]);

  useEffect(() => {
    getDashBoardData((res) => setDashboardData(res));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-150 font-barlow">
        <main className=" flex overflow-x-auto">
          <SideBar/>
          <section className="p-8 ">
            <div className="flex justify-between w-full items-center">
              <span className="uppercase font-barlow-semi-condensed">
                dashboard
              </span>
              <button
                className="uppercase text-xs font-semibold  bg-yellow flex justify-center items-center  h-8 w-24	 rounded-2xl"
                onClick={() => {
                  dispatch({ type: 'SIGN_OUT' });
                  dispatch({ type: 'PURGE' });
                  localStorage.removeItem('token');
                  history.push('/');
                }}
              >
                sign out
              </button>
            </div>
            <p className="text-gray-400 mt-6">In last 30 days</p>
            <div className="w-full flex gap-x-6 ">
              <div className="w-64 rounded-md h-20 border p-4 ">
                <p className="text-sm">
                  Active Users{' '}
                </p>
                <span className="text-lg font-bold">
                  {dashboardData?.data?.totalUniqueCustomers}
                </span>
              </div>
              <div className="w-64 rounded-md h-20 border p-4">
                <p className="text-sm">
                  Total Orders{' '}
                </p>
                <span className="text-lg font-bold">
                  {dashboardData?.data?.totalCount}
                </span>
              </div>
              <div className="w-64 rounded-md h-20 border p-4">
                <p className="text-sm">
                  Total Sales{' '}
                </p>
                <span className="text-lg font-bold">
                  ₹{dashboardData?.data?.totalAmount}
                </span>
              </div>
              <div className="w-64 rounded-md h-20 border p-4">
                <p className="text-sm">
                  Average Customer Spend{' '}
                </p>
                <span className="text-lg font-bold">
                  ₹{dashboardData?.data?.averageCustomerSpend}
                </span>
              </div>
            </div>
            <div className="w-full  mt-8 ">
              <Line
                options={{
                  title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20,
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                  responsive: true,
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: true,
                          borderDash: [3, 3],
                          zeroLineColor: 'blue',
                        },
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: false,
                        gridLines: {
                          display: false,
                          lineWidth: 0,
                          zeroLineColor: 'transparent',
                        },
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
                data={{
                  labels: graphData?.labels,

                  datasets: [
                    {
                      label: 'Sales Data',
                      data: graphData.data,
                      borderColor: 'rgb(255, 99, 132,255)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                  ],
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
