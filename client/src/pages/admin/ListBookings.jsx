import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/Admin/Title';
import { dateFormat } from '../../lib/dateFormat';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    
  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  }
    
  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left rounded-md">
          <thead>
            <tr className="bg-primary/20 text-white">
              <th className="p-3 min-w-[120px]">User Name</th>
              <th className="p-3 min-w-[150px]">Movie Name</th>
              <th className="p-3 min-w-[150px]">Show Time</th>
              <th className="p-3 min-w-[120px]">Seats</th>
              <th className="p-3 min-w-[100px]">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                <td className="p-3">{item.user.name}</td>
                <td className="p-3 truncate max-w-[150px]">{item.show.movie.title}</td>
                <td className="p-3">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-3">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")}</td>
                <td className="p-3">{currency}{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />;
}

export default ListBookings;
