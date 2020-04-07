export const parseDate = (date: string) => {
  if (date !== '') {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    const hours = date.substring(11, 13)
    const minutes = date.substring(14, 16)
    return (day + "." + month + "." + year + " " + hours + "." + minutes)
  }
}