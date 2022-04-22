import React from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface InterTakeTask {
  input: string;
}

type AddFieldProps = {
  onClickAdd: () => void;
  onChangeInput: (event: any) => void;
  handleChecked: () => void;
  checked: boolean;
  inputTakeTask: InterTakeTask;
};

export const AddField: React.FC<AddFieldProps> = ({
  onClickAdd,
  onChangeInput,
  handleChecked,
  inputTakeTask,
  checked,
}) => {
  return (
    <div className="field">
      <Checkbox
        onChange={handleChecked}
        checked={checked}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        name="input"
        value={inputTakeTask.input}
        onChange={onChangeInput}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};
