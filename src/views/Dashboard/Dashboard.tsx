
import { ComputeUtilization } from '../../App.types'
import InstanceTableColumns from './components/InstanceTableColumns'
import SimpleReactTable from '../../components/SimpleReactTable/SimpleReactTable'
import ViewInstanceModal from './components/ViewInstanceModal'
import TableFilters from './components/TableFilters'
import { formatBytes, intancesJson, handleSearchFilter, handleFilterByKey, handleTypeFilter } from './Dashboard.utils'
import { useEffect, useState } from 'react'
import { Table, IDashboard } from './Dashboard.types'

function Dashboard({ instanceUsage, filterables }: IDashboard) {
  const [envFilter, setEnvFilter] = useState<string>('')
  const [initTableData, setInitTableData] = useState<Table[]>([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
  const [isModalOpen, setisModalOpen] = useState<boolean>(false)
  const [selectedInstance, setSelectedInstance] = useState<Table>()
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [tableData, setTableData] = useState<Table[]>([])
  const [teamsFilter, setTeamsFilter] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    const formatTableData = (): void => {
      const data: Table[] = []
      instanceUsage?.map((instance: ComputeUtilization) => {
        const { labels, cpuUsage, memUsage, memory, cpus } = instance
        const type = handleTypeRequirements({ memory: memory, cpus })
        const memPresentage: number = Math.floor(memUsage / memory * 100)
        const cpuPresentage: number = Math.floor(cpuUsage / cpus * 100)
        const status = handleStatus({ cpuPresentage, memPresentage })
        if (instance) {
          data.push({
            ...instance,
            type,
            team: labels.team,
            env: labels.environment,
            cpuUsage: +cpuUsage.toFixed(2),
            cpuPresentage: Math.floor(cpuUsage / cpus * 100),
            memUsage: formatBytes(memUsage),
            memory: formatBytes(memory),
            memPresentage: memPresentage,
            status
          })
        }
        return false
      })
      setTableData(data || [])
      setInitTableData(data || [])
    }
    formatTableData()
  }, [instanceUsage])

  useEffect(() => {
    const handleFilterTable = () => {
      setIsTableLoading(true)
      let currentTableData: any = initTableData
      currentTableData = handleFilterByKey({ currentTableData, key: { keyName: 'env' }, filterValue: envFilter });
      currentTableData = handleFilterByKey({ currentTableData, key: { keyName: 'team' }, filterValue: teamsFilter });
      currentTableData = handleFilterByKey({ currentTableData, key: { keyName: 'status' }, filterValue: statusFilter });
      currentTableData = handleSearchFilter({ currentTableData, searchFilter })
      currentTableData = handleTypeFilter({ currentTableData, typeFilter })
      if (currentTableData?.length < pageSize) {
        setPageSize(10)
      }
      setTableData(currentTableData)
      setTimeout(() => {
        setIsTableLoading(false)
      }, 1000)
    }
    handleFilterTable()
  }, [envFilter, teamsFilter, initTableData, statusFilter, searchFilter, pageSize, typeFilter])

  const handleTypeRequirements = ({ memory, cpus }: { memory: number, cpus: number }) => {
    let instanceType = ''
    intancesJson.map((instances: any) => {
      const { requirements } = instances
      if (requirements({ memory })) {
        const mem = formatBytes(memory).split(' ')[0]
        const cpuType = cpus ? `c${cpus}.` : ''
        const memType = memory ? `${mem}${instances.instanceType}` : ''
        instanceType = `${cpuType}${memType}`
      }
      return true
    });
    return instanceType
  }

  const handleStatus = ({ cpuPresentage, memPresentage }: { cpuPresentage: number, memPresentage: number }) => {
    let instanceStatus = 'Right Sized'
    const memoryStatus = memPresentage < 100 && memPresentage >= 60 ? 'Right Sized' : (memPresentage < 59 && memPresentage > 50) ? 'Warning' : 'Danger';
    const cpuStatus = cpuPresentage < 100 && cpuPresentage >= 60 ? 'Right Sized' : (cpuPresentage < 59 && cpuPresentage > 50) ? 'Warning' : 'Danger';
    if (memoryStatus === 'Danger' || cpuStatus === 'Danger') {
      instanceStatus = 'Danger'
    } else if (cpuStatus === 'Warning' || memoryStatus === 'Warning') {
      instanceStatus = 'Warning'
    }
    return instanceStatus
  }

  const handleOpenModal = (isOpen: boolean, instance?: any) => {
    if (instance) {
      setSelectedInstance(instance)
      setisModalOpen(isOpen)
    }
  }

  return (
    <div className='h-100 bg-dark-500 '>
      <section className='card px-3 bg-dark-500 text-light'>
        <div className='card-body'>
          <h3>Instances</h3>
          <p>Use this table to help find how your instances are holding up over the last 30 days</p>
          <TableFilters
            envFilter={envFilter}
            filterables={filterables}
            searchFilter={searchFilter}
            statusFilter={statusFilter}
            teamsFilter={teamsFilter}
            typeFilter={typeFilter}
            handleTypeRequirements={handleTypeRequirements}
            setEnvFilter={setEnvFilter}
            setSearchFilter={setSearchFilter}
            setStatusFilter={setStatusFilter}
            setTeamsFilter={setTeamsFilter}
            setTypeFilter={setTypeFilter}
          />
          <SimpleReactTable
            data={tableData || []}
            pageSize={pageSize}
            columns={InstanceTableColumns(handleOpenModal)}
            classStyles='table-dark'
            isLoading={isTableLoading}
            onPageSizeChange={(e: number) => setPageSize(e)}
          />
        </div>
      </section>
      <ViewInstanceModal
        instance={selectedInstance}
        isOpen={isModalOpen}
        filterables={filterables}
        handleTypeRequirements={handleTypeRequirements}
        onModalClose={() => setisModalOpen(false)}
      />
    </div>
  )
}
export default Dashboard;