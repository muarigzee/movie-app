import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dateFormat } from "../lib/dateFormat";
import timeFormat from "../lib/timeformat";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-20 md:pt-28 min-h-[80vh]">
      <BlurCircle top="100px" right="100px" />
      <BlurCircle bottom="0px" left="600px" />

      <h1 className="text-lg font-semibold mb-5">My Bookings</h1>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between gap-4 bg-primary/5 border border-primary/20 rounded-md mt-3 px-4 py-3 max-w-3xl"
          >
            {/* Movie Poster */}
            <div className="flex gap-3">
              <img
                src={item.show.movie.poster_path}
                alt={item.show.movie.title}
                className="w-20 h-28 rounded-md object-cover"
              />

              {/* Movie Details */}
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold">{item.show.movie.title}</p>
                <p className="text-gray-400 text-xs">
                  {timeFormat(item.show.movie.runtime)}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {dateFormat(item.show.showDateTime)}
                </p>
              </div>
            </div>

            {/* Booking Info */}
            <div className="flex flex-col text-xs text-gray-300 font-medium gap-1">
              <p>
                <span className="font-semibold">Total Tickets:</span>{" "}
                {item.bookedSeats.length}
              </p>
              <p>
                <span className="font-semibold">Seat Number:</span>{" "}
                {item.bookedSeats.join(", ")}
              </p>

              {!item.isPaid && (
                <button className="mt-2 px-3 py-1 text-xs bg-primary hover:bg-primary-dull transition rounded font-medium cursor-pointer">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No bookings yet.</p>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
