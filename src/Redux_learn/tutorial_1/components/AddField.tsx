import React from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface paramTakeTask {
  input: string;
}

type AddFieldProps = {
  onAdd: (text: string, checked: boolean) => void;
};

export const AddField: React.FC<AddFieldProps> = ({ onAdd }) => {
  const [inputTakeTask, setInputTakeTask] = React.useState('');

  const onChangeInput = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputTakeTask(event.target.value);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };
  const onClickAdd = () => {
    onAdd(inputTakeTask, checked);
    setChecked(false);
    setInputTakeTask('');
  };

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
        value={inputTakeTask}
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
