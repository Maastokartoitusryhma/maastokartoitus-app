//Limits the list of events into 5 events that have been sent to the server plus all the events that haven't been sent yet.
export const limitedEventList = ((observationEvents: Array<object>) => {
  let eventsSent = observationEvents.filter(event => event.sentToServer === true)
  while(eventsSent.length > 5) {
    eventsSent.shift()
  }
  const eventsNotSent = observationEvents.filter(event => event.sentToServer === false)
  const eventsToStore = eventsSent.concat(eventsNotSent)
  return eventsToStore
})