import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type State = Task[];

type AddTaskAction = {
  type: 'ADD_TASK';
  payload: Task;
};

type RemoveTaskAction = {
  type: 'REMOVE_TASK';
  payload: number;
};

function reducer(state: State, action: AddTaskAction | RemoveTaskAction) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    case 'REMOVE_TASK':
      return state.filter((_, index) => index !== action.payload);
  }
  return state;
}

function App() {
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

  const addTask = (text: string, checked: boolean) => {
    if (text.trim()) {
      let newId = state.length;
      const makeId = () => {
        return newId++;
      };
      makeId();
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: newId,
          text: text,
          completed: checked,
        },
      });
    }
  };

  const removeTask = (id: number) => {
    console.log(id);
    if (window.confirm('Вы хотите удалить задачу?')) {
      dispatch({
        type: 'REMOVE_TASK',
        payload: id,
      });
    }
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj, index) => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              removeTask={() => removeTask(index)}
            />
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
