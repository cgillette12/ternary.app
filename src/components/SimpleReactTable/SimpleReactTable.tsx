import ReactTable from 'react-table-v6'
import 'react-table/react-table.css';

interface ISimpleReactTableProps {
  columns?: any[];
  data?: any[];
  style?: any;
  noData?: string;
  handleOpenModal?: any;
  onRowClick?: any;
  classStyles?: string;
  showPag?: boolean;
  pageSize?: number;
}
const SimpleReactTable = (props: ISimpleReactTableProps) => {

  const {
    data,
    columns,
    pageSize,
    noData,
    handleOpenModal,
    classStyles,
    showPag,
    onRowClick,
  } = props;

  return (
    <ReactTable
      className={classStyles ? classStyles : '-striped -highlight'}
      data={data}
      columns={columns}
      defaultPageSize={pageSize ? pageSize : 5}
      showPagination={showPag === false ? false : true}
      noDataText={noData}
      getTrProps={(_: any, rowInfo: any) => {
        if (handleOpenModal && rowInfo && rowInfo.row) {
          return {
            onClick: () => {
              props.handleOpenModal(rowInfo);
            },
          };
        } else if (onRowClick && rowInfo && rowInfo.row) {
          return {
            onClick: () => {
              onRowClick(rowInfo);
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
