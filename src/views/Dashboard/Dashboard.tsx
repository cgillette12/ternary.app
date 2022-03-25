import { ComputeUtilization } from '../../App'
import SimpleReactTable from '../../components/SimpleReactTable/SimpleReactTable'
import InstanceTableColumns from './components/InstanceTableColumns'

interface IDashboard {
  instanceUsage: ComputeUtilization[] | null
}

function Dashboard(props: IDashboard) {


  return (
    <div className='h-100'>
      <section className='card p-3'>
        <div className='card-body '>
            <SimpleReactTable
              data={props.instanceUsage || []}
              columns={InstanceTableColumns}
              classStyles="bg-white -highlight"
            />
        </div>
      </section>
    </div>
  )
}
export default Dashboard;