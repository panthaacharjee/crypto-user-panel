import React, { useState } from 'react'
import Pagination from './Pagination'

const History = ({array}) => {
    const [first, setFirst] = useState(0)
    const [last, setLast]  = useState(10)
  
    return (
      <div>
          <table className='w-full mt-10' >
              <thead className='border-2 border-black bg-[#CB0881]'>
                  <tr className='w-full text-white'>
                      <th className='border-2 border-[#CB0881] px-3 py1 w-3/12'>Serial</th>
                      <th className='border-2 border-[#CB0881] px-3 py1 w-3/12'>Amount</th>
                      <th className='border-2 border-[#CB0881] px-3 py1 w-3/12'>Date</th>
                      <th className='border-2 border-[#CB0881] px-3 py1 w-3/12'>Time</th>
                  </tr>
              </thead>
              <tbody>
                  {array?.slice(first, last).map((val, key)=>{
                      const date = new Date(val.history.createdAt)
                      let day = date.getDate()
                      let month = date.getMonth()+1
                      let year = date.getFullYear() 
                      const newDate = `${day}/${month}/${year}`
  
                    
  
                      const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      const formattedTime = formatter.format(date);
                      return(
                          <tr className='w-full text-center'>
                                  <td className='border-2 border-[#CB0881] px-3 py1 w-3/12'>{val?._id}</td>
                                  <td className='border-2 border-[#CB0881] px-3 py1 w-3/12'>{val.history?.amount.toFixed(2)}</td>
                                  <td className='border-2 border-[#CB0881] px-3 py1 w-3/12'>{newDate}</td>
                                  <td className='border-2 border-[#CB0881] px-3 py1 w-3/12'>{formattedTime}</td>
                          </tr>
                      )
                  })}       
              </tbody>
          </table>
          <div className='w-full'>
              <Pagination first={first} last={last} length={array?.length} setFirst={setFirst} setLast={setLast}/>
          </div>
      </div>
    )
}

export default History