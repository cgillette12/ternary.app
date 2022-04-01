import ReactTable from 'react-table-v6'
import 'react-table/react-table.css';

interface ISimpleReactTableProps {
  columns?: any[];
  data?: any[];  
  classStyles?: string;
  pageSize?: number;
  isLoading?: boolean;
  onPageSizeChange?: (pageSize: number) => void;
}

const SimpleReactTable = (props: ISimpleReactTableProps) => {
  const {
    data,
    columns,
    pageSize,
    classStyles,
    isLoading,
    onPageSizeChange
  } = props;
  return (
    <ReactTable
      className={classStyles ? classStyles : '-striped -highlight'}
      data={data}
      columns={columns}
      pageSize={pageSize ? pageSize : 10}
      defaultPageSize={10}
      showPagination={ true}
      loading={isLoading}
      sortable={false}
      onPageSizeChange={onPageSizeChange || false}
    />
  );
};

export default SimpleReactTable;
