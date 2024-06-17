import ReactPaginate from "react-paginate";

type Props = {
  page: number;
  pageSize: number;
  rowCount: number | undefined;
  setPage: (page: number) => void;
}

function Paginator(props: Props) {
  const { page, pageSize, rowCount = 0, setPage } = props;

  const pageCount = Math.ceil(rowCount / pageSize);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  }
  
  if (pageCount == 0) {
    return <></>;
  }

  return (
    <ReactPaginate
      containerClassName="pagination mb-0"
      nextClassName="page-item"
      previousClassName="page-item"
      pageClassName="page-item"
      breakClassName="page-item"
      activeClassName="active"
      disabledClassName="disabled"
      disabledLinkClassName="page-link"
      nextLinkClassName="page-link"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      activeLinkClassName="active"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      forcePage={page}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      marginPagesDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
    />
  );
}

export default Paginator;