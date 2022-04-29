import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type State = Task[];

type AddTaskAction = {
  type: 'ADD_TASK';
  payload: {
    text: string;
    completed: boolean;
  };
};

type RemoveTaskAction = {
  type: 'REMOVE_TASK';
  payload: { id: number };
};

type ToggleTaskAction = {
  type: 'TOGGLE_COMPLETE';
  payload: { id: number };
};

type ToggleCompleteAllAction = {
  type: 'TOGGLE_COMPLETE_ALL';
};

type ClearTasksAction = {
  type: 'CLEAR_ALL_TASKS';
};

type SortTabsAction = {
  type: 'SORT_TABS';
};

type Actions =
  | AddTaskAction
  | RemoveTaskAction
  | ToggleTaskAction
  | ToggleCompleteAllAction
  | ClearTasksAction
  | SortTabsAction;

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'ADD_TASK':
      let newId = state.length + 1;

      return [
        ...state,
        {
          id: newId,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    case 'REMOVE_TASK':
      console.log('remove');
      return state.filter((obj) => obj.id !== action.payload.id);
    case 'TOGGLE_COMPLETE':
      return [...state].map((obj) => {
        if (obj.id === action.payload.id) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      });
    case 'TOGGLE_COMPLETE_ALL':
      const allCompleted = state.every((obj) => obj.completed === true);
      return state.map((obj) => {
        if (allCompleted === false) {
          return {
            ...obj,
            completed: true,
          };
        } else if (allCompleted === true) {
          return {
            ...obj,
            completed: false,
          };
        }
        return obj;
      });
    case 'CLEAR_ALL_TASKS':
      return [];
    case 'SORT_TABS':
      return state;
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

  const allCompleted = state.every((obj) => obj.completed === true);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = ['Все', 'Активные', 'Завершенные'];

  const addTask = (text: string, checked: boolean) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text: text,
        completed: checked,
      },
    });
  };

  const removeTask = (id: number) => {
    if (window.confirm('Вы хотите удалить задачу?')) {
      dispatch({
        type: 'REMOVE_TASK',
        payload: { id },
      });
    }
  };

  const toggleComplete = (id: number) => {
    dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: { id },
    });
  };

  const toggleCompleteAll = () => {
    dispatch({
      type: 'TOGGLE_COMPLETE_ALL',
    });
  };

  const clearTasks = () => {
    dispatch({
      type: 'CLEAR_ALL_TASKS',
    });
  };

  const sortTabs = (index: number) => {
    setActiveTab(index);
    dispatch({
      type: 'SORT_TABS',
    });
  };
  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={activeTab}>
          {tabs.map((item, index) => (
            <Tab key={`${item}_${index}`} label={item} onClick={() => sortTabs(index)} />
          ))}
        </Tabs>
        <Divider />
        <List>
          {state
            .filter((obj) => {
              if (activeTab === 0) {
                return true;
              } else if (activeTab === 1 && obj.completed === false) {
                return true;
              } else if (activeTab === 2 && obj.completed === true) {
                return true;
              }
            })
            .map((obj) => (
              <Item
                task={obj}
                key={obj.id}
                removeTask={removeTask}
                onClickCheckbox={toggleComplete}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={toggleCompleteAll}>
            {allCompleted ? 'Снять отметки' : 'Отметить все'}
          </Button>
          <Button onClick={clearTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
