import { useState, useMemo } from 'react'
import { ComputeUtilization } from '../../App'
import SimpleReactTable from '../../components/SimpleReactTable/SimpleReactTable'
import InstanceTableColumns  from './components/InstanceTableColumns'

interface IDashboard {
  instanceUsage: ComputeUtilization[] | null
}

function Dashboard(props: IDashboard) {
  const columns = useMemo(() => InstanceTableColumns,[])


  return (
    <div className='h-100'>
      <SimpleReactTable
        data={props.instanceUsage || []}
        columns={columns}
        classStyle='bg-white -highlight'
      />
    </div>
  )
}
export default Dashboard;