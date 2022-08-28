import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoErrorPanel } from './components/TodoErrorPanel';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoStatusBar } from './components/TodoStatusBar';
import { Todo } from './types/Todo';

export enum FilterType {
  All,
  Active,
  Completed,
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const changeFilter = useCallback((selectedFilter: FilterType) => {
    setFilterType(selectedFilter);
  }, []);

  const onAdd = useCallback((newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  console.log(`userId: ${user?.id}`);
  //useContext

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return true;
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filterType, todos]);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {user && (
          <>
            <TodoForm
              newTodoField={newTodoField}
              user={user}
              onAdd={onAdd}
            />

            <TodoList
              newTodoField={newTodoField}
              user={user}
              todos={filteredTodos}
              setTodos={setTodos}
            />
          </>
        )}

        <TodoStatusBar
          todos={todos}
          changeFilter={changeFilter}
          filterType={filterType}
          clearCompleted={clearCompleted}
        />
      </div>

      <TodoErrorPanel />
    </div>
  );
};
