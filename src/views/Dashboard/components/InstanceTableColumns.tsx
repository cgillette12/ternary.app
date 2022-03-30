
export const InstanceTableColumns = (handleOpenModal: (isOpen: boolean, values: any) => void) => [
  {
    Header: 'Id',
    accessor: 'id',
    disableSortBy: false,
  },
  {
    Header: 'Type',
    accessor: 'type',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    },
  },
  {
    Header: 'Team',
    accessor: 'team',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Env',
    accessor: 'env',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPUs',
    accessor: 'cpus',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPU Usage',
    accessor: 'cpuUsage',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPU %',
    accessor: 'cpuPresentage',
    disableSortBy: false,
    Cell: (props: any) => {
      const bgColor = props?.value < 100 && props?.value >= 60 ? 'bg-success' : (props?.value < 59 && props?.value > 50) ? 'bg-warning' : 'bg-danger';
      return (<div className={`${bgColor} text-white text-center my-1`}> {props?.value || 0}%</div>)
    }
  },
  {
    Header: 'Memory',
    accessor: 'memory',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Memory Usage',
    accessor: 'memUsage',
    disableSortBy: false,
    Cell: (props: any) => {
      return (<div className={`text-center my-1`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Memory %',
    accessor: 'memPresentage',
    disableSortBy: false,
    Cell: (props: any) => {
      const bgColor = props?.value < 100 && props?.value >= 60 ? 'bg-success' : (props?.value < 59 && props?.value > 50) ? 'bg-warning' : 'bg-danger';
      return (<div className={`${bgColor} text-white text-center my-1`}> {props?.value || 0}%</div>)
    }
  },
  {
    Header: '',
    accessor: '',
    disableSortBy: false,
    Cell: (props: { value: any, row: any }) => {
      const { row: { _original: rowData } } = props;
      return (
        <div className='text-center'>
          <div className='btn btn-primary' onClick={() => handleOpenModal(true, rowData)}>View</div>
        </div>
      )
    }
  },

];
export default InstanceTableColumns;
