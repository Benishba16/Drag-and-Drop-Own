import React from "react";
import "./column.css"
import Task from "./task";
import {Droppable} from "react-beautiful-dnd"

function Column(props) {
  console.log("props", props);
  const { column, tasks } = props;
  return (
    <div className="column-container">
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-comp"
            >
                {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                {provided.placeholder}
            </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
