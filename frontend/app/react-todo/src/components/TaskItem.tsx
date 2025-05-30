import { FC, memo } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import useStore from '../store'
import { useMutateTask } from '../hooks/useMutateTask'
import { Task } from '../types'

const TaskItemMemo: FC<Omit<Task, 'created_at' | 'updated_at'>> = ({ id, title }) => {
  const updateTask = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();
  return (
  <li className="my-3">
    <span className="font-bold">{title}</span>
    <div className="flex float-right ml-20">
      <PencilIcon className="h-5 w-5 cursor-pointer mx-1 text-blue-500" onClick={() => updateTask({ id, title })} />
      <TrashIcon className="h-5 w-5 cursor-pointer text-blue-500" onClick={() => deleteTaskMutation.mutate({ id })} />
    </div>
  </li>
  )
}

export const TaskItem = memo(TaskItemMemo)
