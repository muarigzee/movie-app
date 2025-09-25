import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import { toast } from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];
  const { id, date } = useParams();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  // Handle seat selection
  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select up to 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  // Render seats row
  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary/60 cursor-pointer transition
              ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  // Fetch show data
  useEffect(() => {
    const movie = dummyShowsData.find((s) => s._id === id);
    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-20 gap-10">
      {/* Available Timings */}
      <div className="md:w-64 shrink-0">
        <div className="bg-primary/10 border border-primary/20 rounded-lg py-6 px-4 h-max md:sticky md:top-24 shadow-sm">
          <p className="text-lg font-semibold mb-4">Available Timings</p>

          <div className="space-y-2">
            {show.dateTime[date]?.map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white shadow"
                    : "hover:bg-primary/20"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm">{isoTimeFormat(item.time)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img
          src={assets.screenImage}
          alt="screen"
          className="max-w-[400px] w-full"
        />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          {/* First group (A-B) */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Remaining groups */}
          <div className="grid grid-cols-2 gap-8">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          disabled={!selectedTime || selectedSeats.length === 0}
          className="flex items-center gap-2 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95 disabled:opacity-50"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
