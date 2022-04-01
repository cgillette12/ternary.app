import SimpleDropdown from '../../../components/SimpleDropdown/SimpleDropdown'
import InstanceTypeDropDown from '../components/InstanceTypeDropDown'
import { Filterables } from '../../../App.types'

interface ITableFilters {
  filterables: Filterables;
  teamsFilter: string;
  envFilter: string;
  searchFilter: string;
  statusFilter: string;
  typeFilter: string;
  handleTypeRequirements: (values: { memory: number, cpus: number }) => string;
  setEnvFilter: (env: string) => void;
  setSearchFilter: (status: string) => void;
  setStatusFilter: (status: string) => void;
  setTeamsFilter: (teams: string) => void;
  setTypeFilter: (teams: string) => void;
}

function TableFilters({
  envFilter,
  filterables,
  searchFilter,
  statusFilter,
  teamsFilter,
  typeFilter,
  handleTypeRequirements,
  setEnvFilter,
  setSearchFilter,
  setStatusFilter,
  setTeamsFilter,
  setTypeFilter,
}: ITableFilters) {
  return (
    <div className='mb-3'>
      <div className='d-flex align-items-center'>
        <div className='w-25'>
          <label style={{ fontSize: 14 }}>Search:</label>
          <div className='me-3'>
            <input type='text' value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className='w-100' />
          </div>
        </div>
        <div className='me-3'>
          <InstanceTypeDropDown
            value={typeFilter}
            filterables={filterables}
            onChange={setTypeFilter}
            handleTypeRequirements={handleTypeRequirements}
          />
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Team'
            options={filterables?.teams || []}
            value={teamsFilter}
            onChange={setTeamsFilter}
          />
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Env'
            options={filterables?.envs || []}
            value={envFilter}
            onChange={setEnvFilter}
          />
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Status'
            options={['Right Sized', 'Warning', 'Danger']}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>
    </div>
  )
}

export default TableFilters