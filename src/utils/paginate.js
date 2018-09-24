/**
 * Need data and pager
 * pager must have pageCount, moviesPerPage set
 */
const paginate = (dataLength, pageCount, dataPerPage) => {
  let startIndex = (pageCount - 1) * dataPerPage;
  let endIndex = startIndex + dataPerPage; // here -1 is not done as slice not allow it
  let noOfPages = Math.ceil(dataLength / dataPerPage);
  let result = {};
  result.startIndex = startIndex;
  result.endIndex = endIndex;
  result.noOfPages = noOfPages;
  return result;
};

export default paginate;
