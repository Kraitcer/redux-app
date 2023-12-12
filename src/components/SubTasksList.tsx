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

import { useSelector } from "react-redux";

import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

interface Props {
  currentTaskID: string;
}

const SubTasksList = ({ currentTaskID }: Props) => {
  const subTasksOfTheCurrentTask = useSelector(
    selectSubTasksOfTheCurrentTask(currentTaskID)
  );

  // ==============================ADD================================
  const addSubTaskToStore = (subTaskName: string) => {
    store.dispatch(addSubTask(subTaskName, currentTaskID));
  };
  // ==============================EDIT===============================

  const editSubTaskOut = (id: string, subTaskName: string) => {
    store.dispatch(editSubTask(id, subTaskName));
  };

  // ==============================DELETE=============================
  const deleteSubTaskOut = (id: string) => {
    store.dispatch(deleteSubTask(id));
  };

  // ==============================COMPLETE===========================
  const completeSubTaskOut = (id: string) => {
    store.dispatch(completeSubTask(id));
  };
  // ==============================SUBTASKS MOOVING ITEMS=============
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) {
      return;
    }
    const oldIndex = subTasksOfTheCurrentTask.findIndex(
      (subTask) => subTask.id === active.id
    );
    const newIndex = subTasksOfTheCurrentTask.findIndex(
      (subTask) => subTask.id === over.id
    );
    store.dispatch(
      setSubTask(arrayMove(subTasksOfTheCurrentTask, oldIndex, newIndex))
    );
  };
  // ==============================RENDER FASE=============================
  return (
    <>
      <AddSubTask
        addTodo={addSubTaskToStore}
        placeHolder="Create Sub Task"
        buttonName="Add"
      />
      <DndContext
        collisionDetection={closestCenter}
        // onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={subTasksOfTheCurrentTask}
          strategy={verticalListSortingStrategy}
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
        </SortableContext>
      </DndContext>
    </>
  );
};

export default SubTasksList;
