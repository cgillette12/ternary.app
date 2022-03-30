import ReactTable from 'react-table-v6'
import 'react-table/react-table.css';

interface ISimpleReactTableProps {
  columns?: any[];
  data?: any[];
  style?: any;
  noData?: string;
  onRowClick?: any;
  classStyles?: string;
  showPag?: boolean;
  pages?: number;
  pageSize?: number;
  isLoading?: boolean;
  handleOpenModal?: (rowValue: any) => void;
  onPageSizeChange?: (pageSize: number) => void;
}
const SimpleReactTable = (props: ISimpleReactTableProps) => {
  const {
    data,
    columns,
    pageSize,
    noData,
    classStyles,
    showPag,
    isLoading,
    handleOpenModal,
    onPageSizeChange
  } = props;
  return (
    <ReactTable
      className={classStyles ? classStyles : '-striped -highlight'}
      data={data}
      columns={columns}
      pageSize={pageSize ? pageSize : 10}
      defaultPageSize={10}
      showPagination={showPag === false ? false : true}
      noDataText={noData}
      loading={isLoading}
      sortable={false}
      onPageSizeChange={onPageSizeChange || false}
      getTrProps={(_: any, rowInfo: any) => {
        if (handleOpenModal && rowInfo && rowInfo.row) {
          return {
            onClick: () => {
              handleOpenModal(rowInfo);
            },
          };
        } else {
          return {};
        }
      }}
    />
  );
};

export default SimpleReactTable;
