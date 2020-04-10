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