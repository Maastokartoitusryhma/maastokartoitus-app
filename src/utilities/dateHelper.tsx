// Creates a date string in format 'yyyy-MM-ddTHH:mm'
export const setDateForDocument = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()
  const hours = date.getHours() <  10 ? ("0" + date.getHours()) : date.getHours()
  const minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()
  return year + "-" + month + "-" + day + "T" + hours + ":" + minutes
}

// Parses date from format 'dd.MM.yyyy HH.mm' to 'yyyy-MM-ddTHH:mm'
export const parseDateForUI = (date: string) => {
  if (date !== '') {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    const hours = date.substring(11, 13)
    const minutes = date.substring(14, 16)
    return (day + "." + month + "." + year + " " + hours + "." + minutes)
  }
}

// Parses date from format 'yyyy-MM-ddTHH:mm' to 'dd.MM.yyyy HH.mm'
export const parseDateForDocument = (date: string) => {
  if (date !== '') {
    const day = date.substring(0, 2)
    const month = date.substring(3, 5)
    const year = date.substring(6, 10)
    const hours = date.substring(11, 13)
    const minutes = date.substring(14, 16)

    return (year + "-" + month + "-" + day + "T" + hours + ":" + minutes)
  }
}

// Parses date from format 'yyyy-MM-ddTHH:mm:ss.sssZ' to 'yyyy-MM-ddTHH:mm'
export const parseDateFromISOToDocument = (dateObject: Date) => {
  if (dateObject !== undefined) {
    const date = dateObject.toISOString()
    const time = dateObject.toLocaleTimeString()
    const dateMonthAndYear = date.substring(0, 11)
    const hoursAndMinutes = time.substring(0, 5)
    return (dateMonthAndYear + hoursAndMinutes)
  }
}