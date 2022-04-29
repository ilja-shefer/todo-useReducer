import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Task } from '../App';

type ItemProps = {
  task: Task;
  removeTask: (id: number) => void;
  onClickCheckbox: (id: number) => void;
};

export const Item: React.FC<ItemProps> = ({ task, removeTask, onClickCheckbox }) => {
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          checked={task.completed}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          onChange={() => onClickCheckbox(task.id)}
        />
        <Typography className="item-text">{task.text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={() => removeTask(task.id)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
