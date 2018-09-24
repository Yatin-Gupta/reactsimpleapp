import _ from "lodash";
/*
Input: 
data : Data to sort
sorter: must have fields that have name and order(no,asc,desc) and a activeField property
mappings: for nested property(one level of nesting), like
if sort is needed to applied on genre 
and it is defined as 
{
    genre:{name: 'Action'}
}
then mappings get
mappings = { genre:'name' }

*/
const sortData = (data, sorter, mappings = {}) => {
  let sortField = {};
  sorter.fields.forEach(field => {
    if (sorter.activeField === field.name) {
      sortField = field;
    }
  });
  let sortedData = data;
  if (sortField.order !== "no") {
    let tempData = data.map(row => {
      if (!_.isEmpty(mappings)) {
        for (var prop in mappings) {
          if (sortField.name === prop) {
            row["sortField"] = ("" + row[prop][mappings[prop]]).toLowerCase();
            return row;
          }
        }
      }
      row["sortField"] = ("" + row[sortField.name]).toLowerCase();
      return row;
    });
    let sortedTempData = _.orderBy(tempData, "sortField", sortField.order);
    sortedData = sortedTempData.map(movie => {
      return _.omit(movie, "sortField");
    });
  }
  return sortedData;
};

export default sortData;
