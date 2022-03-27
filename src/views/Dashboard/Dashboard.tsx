
import { useEffect, useState } from 'react'
import { ComputeUtilization } from '../../App'
import SimpleReactTable from '../../components/SimpleReactTable/SimpleReactTable'
import InstanceTableColumns from './components/InstanceTableColumns'
import { formatBytes, intancesJson } from './Dashboard.utils'
import SimpleDropdown from '../../components/SimpleDropdown/SimpleDropdown'
import ViewInstanceModal from './components/ViewInstanceModal'
interface IDashboard {
  instanceUsage: ComputeUtilization[] | null
  filterables: any | null
}

function Dashboard({ instanceUsage, filterables }: IDashboard) {
  const [tableData, setTableData]: any = useState([])
  const [initTableData, setInitTableData]: any = useState([])
  const [teamsFilterValue, setTeamsFilterValue] = useState<string>('')
  const [envFilterValue, setEnvFilterValue] = useState<string>('')
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
  const [isModalOpen, setisModalOpen] = useState<boolean>(false)
  const [selectedInstance, setSelectedInstance] = useState<any>([])
  useEffect(() => {
    const formatTableData = (): void => {
      const data = instanceUsage?.map((instance: ComputeUtilization) => {
        const { labels, cpuUsage, memUsage, memory, cpus} = instance
        const type = handleTypeRequirements({ memory: memory, cpus })
        return {
          ...instance,
          type,
          team: labels.team,
          env: labels.environment,
          cpuUsage: cpuUsage.toFixed(2),
          cpuPresentage: Math.floor(cpuUsage / cpus * 100),
          memUsage: formatBytes(memUsage),
          memory: formatBytes(memory),
          memPresentage: Math.floor(memUsage / memory * 100)
        }
      })
      setTableData(data || [])
      setInitTableData(data || [])
    }
    formatTableData()
  }, [instanceUsage])

  useEffect(() => {
    const handleFilterTable = () => {
      setIsTableLoading(true)
      let filterData: any = initTableData
      filterData = envFilterValue ? filterData.filter((data: any) => data.env === envFilterValue) : filterData
      filterData = teamsFilterValue ? filterData.filter((data: any) => data.team === teamsFilterValue) : filterData
      setTableData(filterData)
      setTimeout(() => {
        setIsTableLoading(false)
      }, 1000)
    }
    handleFilterTable()
  }, [envFilterValue, teamsFilterValue, initTableData])

  const handleTypeRequirements = ({ memory, cpus }: { memory: number, cpus: number }) => {
    let instanceType = ''
    intancesJson.map((instances: any) => {
      const { requirements } = instances
      if (requirements({ memory })) {
        const mem = formatBytes(memory).split(' ')[0]
        instanceType = `c${cpus}.${mem}${instances.instanceType}`
      }
      return true
    });
    return instanceType
  }

  const handleOpenModal = (isOpen: boolean, instance?: any) => {
    if (instance) {
      const { original } = instance;
      setSelectedInstance(original)
      setisModalOpen(isOpen)
    }
  }
  return (
    <div className='h-100'>
      <section className='card p-3'>
        <div className='card-body'>
          <div className='mb-3'>
            <h4>Filters</h4>
            <div className='d-flex'>
              <div className='me-3'>
                <SimpleDropdown
                  label='Select Team'
                  options={filterables?.teams || []}
                  value={teamsFilterValue}
                  onChange={(teamValue: string) => {
                    setTeamsFilterValue(teamValue)
                  }}
                />
              </div>
              <div>
                <SimpleDropdown
                  label='Select Env'
                  options={filterables?.envs || []}
                  value={envFilterValue}
                  onChange={(envValue: string) => {
                    setEnvFilterValue(envValue)
                  }}
                />
              </div>
            </div>
          </div>
          <SimpleReactTable
            data={tableData || []}
            columns={InstanceTableColumns}
            classStyles="bg-white -highlight"
            isLoading={isTableLoading}
            handleOpenModal={(instance: any) =>
              handleOpenModal(true, instance)
            }
          />
        </div>
      </section>
      <ViewInstanceModal isOpen={isModalOpen} onModalClose={() => setisModalOpen(false)} instance={selectedInstance}/>
    </div>
  )
}
export default Dashboard;