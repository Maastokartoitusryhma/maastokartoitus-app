import { limitedEventList } from '../utilities/observationEventsHelper'

const observationEvents: Array<object> = [
  {
    id: '1',
    sentToServer: false,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '2',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '3',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '4',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '5',
    sentToServer: false,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '6',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '7',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '8',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '9',
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '10',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  }
]

const limitedEvents: Array<object> = [
  {
    id: '4',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '6',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '7',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '8',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '10',
    sentToServer: true,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '1',
    sentToServer: false,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  },
  {
    id: '5',
    sentToServer: false,
    schema: { 
      "test": {
        "type": "string",
        "title": "test"
      }
    }
  }
]

describe('Observation event helpers - Limited events list', () => {
  it('Returns the correct list for storing.', () => {
    const result = limitedEventList(observationEvents)
    console.log('limited list = ', result)
    expect(result).toEqual(limitedEvents)
  })
})