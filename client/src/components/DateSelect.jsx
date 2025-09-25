import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const onBookHandler = () => {
    if (!selected) return toast('Please select a date')
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0, 0)
  }

  return (
    <div id="dateSelect" className="pt-20">
      <div className="flex items-center justify-between relative px-8 py-4 max-w-5xl mx-auto bg-primary/10 rounded-xl overflow-hidden">
        <BlurCircle top="-80px" left="-80px" />
        <BlurCircle top="-80px" right="0px" />

       
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-3">
            <ChevronLeftIcon width={28} className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />

            <div className="flex flex-wrap gap-4">
              {Object.keys(dateTime).map((date) => {
                const d = new Date(date)
                const isSelected = selected === date 

                return (
                  <button
                    key={date}
                    onClick={() => setSelected(date)}
                    className={`flex flex-col items-center justify-center h-14 w-12 rounded-xl transition-all cursor-pointer
                      ${isSelected
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-primary/30'}`}
                  >
                    <span className="text-base font-bold">{d.getDate()}</span>
                    <span className="text-[10px] uppercase">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </button>
                )
              })}
            </div>

            <ChevronRightIcon width={28} className="cursor-pointer text-gray-400 hover:text-gray-200 transition-colors" />
          </div>
        </div>

    
        <div className="flex items-center">
          <button
            onClick={onBookHandler}
            className="px-6 py-2 rounded-xl bg-primary text-white text-sm hover:bg-primary/90 transition-all cursor-pointer shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelect
