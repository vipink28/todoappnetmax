import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navigation from './common/Navigation';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import { TodoProvider } from './context/TodoContext';

function App() {    
    return (
      <BrowserRouter>
      <TodoProvider>
            <Navigation />
            <Routes>
                <Route exact path='/' element={<Navigate replace to="sign-in" />}></Route>
                <Route exact path='/' element={<Home />  }>
                    <Route index path='/sign-in' element={<SignIn />}></Route>
                    <Route path='/sign-up' element={<SignUp />}></Route>
                </Route>
                <Route path='task-list' element={<TaskList />}></Route>
                <Route path='create-task' element={<CreateTask />}></Route>
            </Routes>
            </TodoProvider>
      </BrowserRouter>
    );
}

export default App;