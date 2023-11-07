import {
  AddNotation as AddSubTask,
  NotationPad as SubTaskPad,
  EditNotation as EditSubTask,
} from "../components/componentsList";
import store from "../store/store";
import {
  selectAllSubTasks,
  selectSubTasksOfTheCurrentTask,
  addSubTask,
  editSubTask,
  deleteSubTask,
  completeSubTask,
} from "../store/subTasksReducer";

import { useSelector } from "react-redux";

interface Props {
  currentTaskID: string;
}

const SubTasksList = ({ currentTaskID }: Props) => {
  const subTasksOfTheCurrentTask = useSelector(
    selectSubTasksOfTheCurrentTask(currentTaskID)
  );

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

  // ==============================RENDER FASE=============================
  return (
    <>
      <AddSubTask
        addTodo={addSubTaskToStore}
        placeHolder="Choose Sub Task"
        buttonName="Add"
      />
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
            moveItem={() => {}}
            nameWidth={"350px"}
            children={""}
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
    </>
  );
};

export default SubTasksList;
