import React, { useEffect, useState } from 'react';

function ViewTasks({ reload }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch('/wp-json/tasks/v1/get-data')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [reload]);

    return (
        <div className='wp-admin-style-table'>

            <h3>Created Tasks</h3>
            <div className="wrap">
                <table className="wp-admin-style-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewTasks;
