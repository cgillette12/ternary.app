
export const InstanceTableColumns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Type',
    accessor: 'type',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Team',
    accessor: 'team',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Env',
    accessor: 'env',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPUs',
    accessor: 'cpus',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPU Usage',
    accessor: 'cpuUsage',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'CPU %',
    accessor: 'cpuPresentage',
    Cell: (props: any) => {
      const bgColor = props?.value < 100 && props?.value >= 60 ? 'bg-success' : (props?.value < 59 && props?.value > 50) ? 'bg-warning' : 'bg-danger';
      return (<div className={`${bgColor} text-white text-center`}> {props?.value || 0}%</div>)
    }
  },
  {
    Header: 'Memory',
    accessor: 'memory',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Memory Usage',
    accessor: 'memUsage',
    Cell: (props: any) => {
      return (<div className={`text-center`}> {props?.value || 0}</div>)
    }
  },
  {
    Header: 'Memory %',
    accessor: 'memPresentage',
    Cell: (props: any) => {
      const bgColor = props?.value < 100 && props?.value >= 60 ? 'bg-success' : (props?.value < 59 && props?.value > 50) ? 'bg-warning' : 'bg-danger';
      return (<div className={`${bgColor} text-white text-center`}> {props?.value || 0}%</div>)
    }
  },

];
export default InstanceTableColumns;
