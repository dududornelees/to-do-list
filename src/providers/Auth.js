import React, { useState, useEffect, useRef } from 'react';
import { createTheme } from '@material-ui/core';

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
    // Temas
    const [lightMode, setLightMode] = useState(false);
    const theme = createTheme({
        palette: {
            mode: lightMode ? 'light' : 'dark',
        },
    });        

    // Input das tarefas
    const [task, setTask] = useState('');

    // Lista de tarefas com localStorage
    const [taskList, setTaskList] = useState(
        localStorage.getItem('taskList')
        ? JSON.parse(localStorage.getItem('taskList'))
        : []
    );

    const [taskId, setTaskId] = useState(0);
    const TaskInputRef = useRef();
    const addToTaskList = () => {
        if(task.length) {            
            setTaskList([...taskList, {taskName: task}]);
            setTask('');
            setTaskId(taskId + 1);
        } else {
            alert('Insira alguma tarefa!');
        }
    }    

    // Remover tarefa
    const removeTask = (task) => {
        const index = taskList.indexOf(task);
        
        if(index >= 0) {
            taskList.splice(index, 1);
            setTaskList([...taskList]);
        } else {
            alert('Erro!');
        }
    }

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    
    return(
        <AuthContext.Provider value={{theme, lightMode, setLightMode, task, setTask, addToTaskList, TaskInputRef, taskList, removeTask}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);