import React from 'react'
import "./task.css"
import {Draggable} from "react-beautiful-dnd"

function Task(props) {
    console.log("Task props", props)
    const {task, index} = props
  return (
      <Draggable draggableId={task.id} index={index}>
          {(provided) => (
            <div
             className='task-name'
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
             >
                 {task.name}
             </div>
            )}
      </Draggable>
  )
}

export default Task