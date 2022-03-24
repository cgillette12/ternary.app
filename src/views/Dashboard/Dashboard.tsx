import { useState } from 'react'
import { ComputeUtilization } from '../../App'

interface IDashboard {
  instanceUsage: ComputeUtilization[]| null
}

function Dashboard(props:IDashboard ) {
  
  return (
    <div className='h-100'>Dashboard</div>
  )
}
export default Dashboard;