import React, {useState} from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './column';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

//removed comment

const finalSpace = {
  tasks: {
    "task-1": {id: "task-1", name: "Gary Goodspeed"},
    "task-2": { id: 'task-2', name: 'Little Cato'},
    "task-3": {id: "task-3", name: "KVN"},
    "task-4": {id: "task-4", name: "Mooncake"},
    "task-5": {id: "task-5",name: "Quinn Ergon"}
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
}


function App() {
  const [characters, setCharacters] = useState(finalSpace)

  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //   console.log("result", result)

  //   const items = Array.from(characters)
  //   console.log("items",items)
  //   const [reorderedItem] = items.splice(result.source.index, 1)
  //   console.log("reorderedItem",reorderedItem)
  //   console.log("Again items", items)

  //   items.splice(result.destination.index, 0, reorderedItem)
  //   console.log("last items", items)

  //   setCharacters(items)
  // }

  const handleDragEnd = result => {
    console.log("result", result)

    const {destination, source, draggableId} = result

    if(!destination) {
      return
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    const start = characters.columns[source.droppableId]
    const finish = characters.columns[destination.droppableId]

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      console.log("newTaskIds",newTaskIds)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      console.log("newColumn",newColumn)

      const newState = {
        ...characters,
        columns: {
          ...characters.columns,
          [newColumn.id] : newColumn
        }
      }
      console.log("newState",newState)

      setCharacters(newState)
      return;
      }

      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      }

      const newState = {
        ...characters,
        columns: {
          ...characters.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      setCharacters(newState)
    }


  return (
    <div className='app-entire'>
      {/* <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className='droppable'>
          <Droppable droppableId='characters' className="dropppable">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                <h1>Characters</h1>
              {characters.map(({id, name, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className="characters-thumb">
                        <img src={thumb} alt={`${name} Thumb`} />
                      </div>
                      <p>
                        { name }
                      </p>
                    </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
          </Droppable>
          </div>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p> */}
      <DragDropContext onDragEnd={handleDragEnd}>
      {characters.columnOrder.map((columnId) => {
        const column = characters.columns[columnId]

        const tasks = column.taskIds.map(taskId => characters.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks}/>
      })}
      </DragDropContext>
    </div>
  );
}

export default App;
