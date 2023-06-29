import React from 'react'

function Searchbar() {
  return (
    <div>
        <form className='w-full'>
            <div className='flex flex-col my-4'>
                <label>Check-In</label>
                <input className='border rounded-md p-2' type="date" />
            </div>
            <div className='flex flex-col my-2'>
                <label>Check-Out</label>
                <input className='border rounded-md p-2' type="date" />
            </div>
            <div className='flex flex-col my-2'>
                <label>Adults</label>
                <input className='border rounded-md p-2' type="number" />
            </div>
            <div className='flex flex-col my-2'>
                <label>Children</label>
                <input className='border rounded-md p-2' type="number" />
            </div>
              <button className='w-full my-4'>Rates & Availabilities</button>
        </form>
    </div>
  )
}

export default Searchbar