import React from 'react'

const Stats = () => {
  return (
    <div className='absolute z-20 bottom-[35%] left-[5%] text-white text-[1.5vw] border border-white rounded-lg px-[1.5vw] py-[1vw]'>
      <div className='flex items-center justify-center pb-[1vw]'>
        <div>
          Your Stats
        </div>
      </div>
      <div>
        <p>Number of Games Played: 10</p>
        <p>Average score in Science: 8</p>
        <p>Average score in History: 7</p>
        <p>Average score in GK: 0</p>
        <p>Average score in CA: 9</p>
      </div>
    </div>
  )
}

export default Stats