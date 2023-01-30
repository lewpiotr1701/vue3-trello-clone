import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuidv4(),
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuidv4(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuidv4(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuidv4(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuidv4(),
          userAssigned: null
        }
      ]
    }
  ]
}
