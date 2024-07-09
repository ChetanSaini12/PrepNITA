export const filterData = (data, filter) => {
  const filteredData = data.filter((item) => {
    if (filter && filter.length) {
      return filter.every((condition) => {
        const { field, operator, value } = condition

        let itemValue = item[field]
        let filterValue = value

        // Helper function to check if a value is an ISO 8601 date string
        const isISODateString = (val) => {
          const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
          return isoDatePattern.test(val)
        }

        // Convert itemValue to string, handling date values
        if (itemValue instanceof Date || isISODateString(itemValue)) {
          itemValue = new Date(itemValue).toISOString()
        } else {
          itemValue = String(itemValue)
        }

        // Convert filterValue to string, handling date values
        if (filterValue instanceof Date || isISODateString(filterValue)) {
          filterValue = new Date(filterValue).toISOString()
        } else {
          filterValue = String(filterValue)
        }

        const compareStrings = (a, b) => {
          if (a.length !== b.length) {
            return a.length - b.length
          }
          return a.localeCompare(b)
        }
        console.log(
          itemValue,
          filterValue,
          compareStrings(itemValue, filterValue)
        )

        switch (operator) {
          case 'eq':
            return compareStrings(itemValue, filterValue) === 0
          case 'neq':
            return compareStrings(itemValue, filterValue) !== 0
          case 'gt':
            return compareStrings(itemValue, filterValue) > 0
          case 'gte':
            return compareStrings(itemValue, filterValue) >= 0
          case 'lt':
            return compareStrings(itemValue, filterValue) < 0
          case 'lte':
            return compareStrings(itemValue, filterValue) <= 0
          case 'contains':
            return itemValue.includes(filterValue)
          default:
            return true
        }
      })
    }
    return true
  })

  return filteredData
}
