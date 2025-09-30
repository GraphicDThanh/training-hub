const filterArrByObjName = (
  arr = [],
  textFilter = ''
) => (
  arr.filter(obj => {
    return (
    obj.name
      .toUpperCase()
      .indexOf(textFilter.toUpperCase()) >= 0)
    }
  )
);


export default filterArrByObjName;