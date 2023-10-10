import React, { useState } from 'react'
import TasksForm from './TasksForm';
import ViewTasks from './ViewTasks';

const Dashboard = () => {
    const [reloadViewTasks, setReloadViewTasks] = useState(false);

    return (
        <div class='wrap'>
            <div class="wp-admin-style">
                <TasksForm setReloadViewTasks={setReloadViewTasks} />
                <ViewTasks reload={reloadViewTasks} />
            </div>
        </div>
    );
}

export default Dashboard;
