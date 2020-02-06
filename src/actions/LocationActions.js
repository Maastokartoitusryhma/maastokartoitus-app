export const updateLocation = location => ({
  type: 'UPDATE_LOCATION',
  data: location,
})

export const appendPath = locations => ({
  type: 'APPEND_PATH',
  data: locations
})