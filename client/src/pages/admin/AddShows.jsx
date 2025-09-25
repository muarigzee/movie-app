import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/Admin/Title";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import { KConverter } from "../../lib/KConverter";

const AddShows = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  useEffect(() => {
    setNowPlayingMovies(dummyShowsData);
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  const handleAddShow = () => {
    if (!selectedMovie) return alert("Select a movie first!");
    if (!showPrice) return alert("Enter the show price!");
    if (Object.keys(dateTimeSelection).length === 0)
      return alert("Select at least one date-time!");

    const selected = nowPlayingMovies.find((m) => m.id === selectedMovie);
    console.log("Adding show:", {
      movie: selected.title,
      price: showPrice,
      schedule: dateTimeSelection,
    });

    // Reset
    setSelectedMovie(null);
    setShowPrice("");
    setDateTimeSelection({});
    setDateTimeInput("");
  };

  return nowPlayingMovies.length > 0 ? (
    <div className="p-6">
      <Title text1="Add" text2="Shows" />
      <p className="mt-8 mb-4 text-lg font-medium text-gray-700">
        Now Playing Movies
      </p>

      {/* Movie Cards */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative cursor-pointer transform transition duration-300 ease-out rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:-translate-y-1 border ${
                selectedMovie === movie.id
                  ? "border-primary scale-105 -translate-y-1"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedMovie(movie.id)}
            >
              {/* ✅ Fixed: Image wrapper with relative for overlay */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-xl">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay: Ratings */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 flex justify-between items-center text-sm">
                  <p className="flex items-center gap-1 text-yellow-400 font-semibold">
                    <StarIcon className="w-4 h-4 fill-current" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300 font-medium">
                    {KConverter(movie.vote_count)}
                  </p>
                </div>
              </div>

              {/* Check Icon if selected */}
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded-full">
                  <CheckIcon
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              )}

              {/* Movie Title & Release */}
              <div className="p-2 mt-1">
                <p className="font-medium truncate">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show Price Input */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="block text-sm font-medium">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <span className="text-gray-400 text-sm">$</span>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none w-28 text-sm"
          />
        </div>
      </div>

      {/* Date and Time Selection */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="block text-sm font-medium">Select Date and Time</label>
        <div className="inline-flex gap-2 border border-gray-600 p-2 rounded-lg items-center">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md text-sm"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="font-medium mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary px-2 py-1 flex items-center rounded bg-primary/10"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleAddShow}
        className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
      >
        Add Show
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default AddShows;
