import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarsIcon,
  UsersIcon,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { dummyDashboardData } from "../../assets/assets"
import Loading from "../../components/Loading"
import Title from "../../components/Admin/Title"
import BlurCircle from "../../components/BlurCircle"

const DashboardCard = ({ title, value, Icon }) => (
  <div className="flex items-center justify-between px-3 py-4 bg-primary/10 border border-primary/20 rounded-lg shadow-sm hover:shadow-md transition-all">
    <div>
      <h1 className="text-sm text-gray-500">{title}</h1>
      <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
    <Icon className="w-6 h-6 text-primary" aria-label={title} />
  </div>
)

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  })
  const [loading, setLoading] = useState(true)

  const dashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    {
      title: "Total Revenue",
      value: `${currency}${new Intl.NumberFormat().format(dashboardData.totalRevenue || 0)}`,
      icon: CircleDollarSignIcon,
    },
    { title: "Active Shows", value: dashboardData.activeShows?.length || "0", icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon },
  ]

  const fetchDashboardData = async () => {
    try {
      // Replace with API later
      setDashboardData(dummyDashboardData)
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return !loading ? (
    <div className="relative w-full lg:w-[80%] pl-6 md:pl-10 pt-6 min-h-[80vh] text-left">
      <Title text1="Admin" text2="Dashboard" />

      {/* Summary Cards */}
      <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
        <BlurCircle top="-100px" left="0" />
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} title={card.title} value={card.value} Icon={card.icon} />
        ))}
      </div>

      {/* Active Shows Section */}
      <div className="mt-10 max-w-5xl">
        <p className="text-lg font-medium mb-4">Active Shows</p>
        <div className="relative flex flex-wrap gap-5">
          <BlurCircle top="100px" left="10%" />

          {dashboardData.activeShows.length === 0 ? (
            <p className="text-gray-500 italic">No active shows available</p>
          ) : (
            dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="w-full sm:w-52 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title || "Movie poster"}
                  className="h-56 w-full object-cover"
                />
                <p className="font-medium p-2 truncate">{show.movie.title}</p>
                <div className="flex items-center justify-between px-2">
                  <p className="text-lg font-medium">
                    {currency} {show.showPrice}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                    <StarsIcon className="w-4 h-4 text-primary fill-primary" aria-label="Rating" />
                    {show.movie.vote_average?.toFixed(1)}
                  </p>
                </div>
                <p className="px-2 pt-2 text-sm text-gray-500">{show.showDateTime}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Dashboard
