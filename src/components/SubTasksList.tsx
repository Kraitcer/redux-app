import { useEffect, useState } from "react";
import {
  AddNotation as AddSubTask,
  NotationPad as SubTaskPad,
  EditNotation as EditSubTask,
} from "../components/componentsList";
import store from "../store/store";
import {
  setSubTask,
  selectSubTasksOfTheCurrentTask,
  addSubTask,
  editSubTask,
  deleteSubTask,
  completeSubTask,
} from "../store/subTasksReducer";
import { Reorder } from "framer-motion";

import { useSelector } from "react-redux";

interface Props {
  currentTaskID: string;
}

const SubTasksList = ({ currentTaskID }: Props) => {
  const subTasksOfTheCurrentTask = useSelector(
    selectSubTasksOfTheCurrentTask(currentTaskID)
  );

  const [subTasksList, setSubTasksList] = useState(subTasksOfTheCurrentTask);

  // =================================ADD=============================
  const addSubTaskToStore = (subTaskName: string) => {
    store.dispatch(addSubTask(subTaskName, currentTaskID));
  };
  // =================================EDIT=============================

  const editSubTaskOut = (id: string, subTaskName: string) => {
    store.dispatch(editSubTask(id, subTaskName));
  };

  // ==============================DELETE=============================
  const deleteSubTaskOut = (id: string) => {
    store.dispatch(deleteSubTask(id));
  };

  // ==============================COMPLETE=============================
  const completeSubTaskOut = (id: string) => {
    store.dispatch(completeSubTask(id));
  };
  // ==============================PROJECTS MOOVING ITEMS=====================
  useEffect(() => {
    store.dispatch(setSubTask(subTasksList));
  }, [subTasksList]);
  // ==============================RENDER FASE=============================
  return (
    <>
      <AddSubTask
        addTodo={addSubTaskToStore}
        placeHolder="Choose Sub Task"
        buttonName="Add"
      />
      <Reorder.Group
        axis="y"
        onReorder={setSubTasksList}
        values={subTasksOfTheCurrentTask}
      >
        {subTasksOfTheCurrentTask.map((subTask, index) =>
          subTask.isEditing ? (
            <EditSubTask
              key={index}
              notationID={subTask.id}
              notationName={subTask.subTaskName}
              onEdit={editSubTaskOut}
            />
          ) : (
            <SubTaskPad
              notationFor={subTask}
              nameWidth={"350px"}
              tasksBadge={""}
              width={"100%"}
              onDelete={deleteSubTaskOut}
              key={subTask.id}
              index={index}
              // moveItem={moveItem}
              notationID={subTask.id}
              notationName={subTask.subTaskName}
              complited={subTask.complited}
              onEdit={editSubTaskOut}
              onComplete={completeSubTaskOut}
            />
          )
        )}
      </Reorder.Group>
    </>
  );
};

export default SubTasksList;
