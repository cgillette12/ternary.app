export const InstanceTableColumns = [
  {
    Header:'Instances',
    columns:[
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'CPU',
        accessor: 'cpus',
      },
      {
        Header: 'CPU Usage',
        accessor: 'cpuUsage',
      },
      {
        Header: 'Memory',
        accessor: 'memory',
      },
      {
        Header: 'Memory Usage',
        accessor: 'memUsage',
      }
    ]
  }
  
];
export default InstanceTableColumns;
