import SimpleDropdown from '../../../components/SimpleDropdown/SimpleDropdown'
interface ITableFilters {
  filterables: { teams: string[], envs: string[] };
  teamsFilter: string;
  envFilter: string;
  searchFilter: string;
  statusFilter: string;
  setEnvFilter: (env: string) => void;
  setSearchFilter: (status: string) => void;
  setStatusFilter: (status: string) => void;
  setTeamsFilter: (teams: string) => void;
}
function TableFilters({
  envFilter,
  filterables,
  searchFilter,
  statusFilter,
  teamsFilter,
  setEnvFilter,
  setSearchFilter,
  setStatusFilter,
  setTeamsFilter,
}: ITableFilters) {
  return (
    <div className='mb-3 '>
      <div className='d-flex align-items-center'>
        <div className='w-25'>
          <label style={{fontSize: 14}}>Search:</label>
          <div className='me-3'>
            <input type="text" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value) } className='w-100' />
          </div>
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Select Team'
            options={filterables?.teams || []}
            value={teamsFilter}
            onChange={(team: string) => {
              setTeamsFilter(team)
            }}
          />
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Select Env'
            options={filterables?.envs || []}
            value={envFilter}
            onChange={(env: string) => {
              setEnvFilter(env)
            }}
          />
        </div>
        <div className='me-3'>
          <SimpleDropdown
            label='Select Status'
            options={['Right Sized', 'Warning', 'Danger']}
            value={statusFilter}
            onChange={(status: string) => {
              setStatusFilter(status)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TableFilters