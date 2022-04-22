import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

export type ArrProps = {
  id: number;
  text: string;
  completed: boolean;
};

function reducer(state: any, action: any) {
  if (action.type === 'ADD_TASK') {
    let newId = state.length;
    const makeId = () => {
      return newId++;
    };
    makeId();
    return [
      ...state,
      {
        id: newId,
        text: action.payload.text,
        completed: action.payload.completed,
      },
    ];
  }
  return state;
}

function App() {
  const [inputTakeTask, setInputTakeTask] = React.useState({
    input: '',
  });

  const onChangeInput = (event: any) => {
    const { name, value } = event.target;
    setInputTakeTask({
      ...inputTakeTask,
      [name]: value,
    });
  };

  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: 'Первая задача',
      completed: false,
    },
    {
      id: 2,
      text: 'Проверил как работает отрисовка списка',
      completed: true,
    },
  ]);

  const addTask = () => {
    if (inputTakeTask.input.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          text: inputTakeTask.input,
          completed: checked,
        },
      });
      setInputTakeTask({
        input: '',
      });
      setChecked(false);
    }
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={addTask}
          onChangeInput={onChangeInput}
          handleChecked={handleChecked}
          checked={checked}
          inputTakeTask={inputTakeTask}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj: any) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
