import React, { useState } from 'react';

function TasksForm({ setReloadViewTasks }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/wp-json/tasks/v1/insert-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Data inserted successfully.');
                setFormData({
                    title: '',
                    description: '',
                });
                setShowAlert(true);
                setReloadViewTasks((prevReload) => !prevReload);
            } else {
                console.error('Error inserting data.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (

        <div className='wp-admin-style-form'>

            <h3>Create Tasks</h3>
            <p>
                Create tasks by submitting the following form
            </p>

            <form className="wp-admin-style-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={{ margin: '10px 0px 10px 0px' }}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ margin: '10px 0px 10px 0px' }}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="button button-primary">Submit</button>
                </div>
            </form>
            {showAlert && (
                <div className="alert alert-success">
                    Data submitted successfully!
                </div>
            )}
        </div>
    );
}

export default TasksForm;
