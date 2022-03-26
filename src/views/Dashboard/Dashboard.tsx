/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ComputeUtilization } from '../../App'
import SimpleReactTable from '../../components/SimpleReactTable/SimpleReactTable'
import InstanceTableColumns from './components/InstanceTableColumns'
import { formatBytes } from './Dashboard.utils'
import SimpleDropdown from '../../components/SimpleDropdown/SimpleDropdown'
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
  useEffect(() => {
    const formatTableData = (): void => {
      const data = instanceUsage?.map((instance: ComputeUtilization) => {
        const { labels, cpuUsage, memUsage, memory, cpus } = instance
        return {
          ...instance,
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
          />
        </div>
      </section>
    </div>
  )
}
export default Dashboard;