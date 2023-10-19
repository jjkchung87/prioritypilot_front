import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import DatePicker from 'react-datepicker'
import UserApi from '../api'



import './Modal.css'; // Add CSS for styling the modal

function Modal({ closeModal, children }) {
  const { currentUser } = useContext(UserContext);
   // State to track loading state for AI text retrieval
   const [loadingAi, setLoadingAi] = useState(false);

  // Function to filter and retrieve tasks that meet the criteria
  const getTasksForToday = () => {
    if (currentUser && currentUser.projects) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in "yyyy-mm-dd" format

      const tasksForToday = currentUser.projects.reduce((acc, project) => {
        const projectTasks = project.tasks.filter(
          (task) =>
            new Date(task.end_date) <= new Date(today) && task.status !== 'Complete'
        );

        return acc.concat(projectTasks);
      }, []);

      return tasksForToday;
    }

    return [];
  };

  const tasksForToday = getTasksForToday();

  // State to track the selected status and adjusted end_date for each task
  const [taskData, setTaskData] = useState(
    tasksForToday.reduce((data, task) => {
      data[task.id] = {
        status: task.status,
        end_date: new Date(task.end_date).toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      return data;
    }, {})
  );

  // Event handler to update the task's status
  const handleStatusChange = (taskId, event) => {
    const newStatus = event.target.value;
    setTaskData((prevData) => ({
      ...prevData,
      [taskId]: { ...prevData[taskId], status: newStatus },
    }));
    // You can add logic to update the task's status in the database/API here.
  };

    // Event handler to update the task's end_date
    const handleEndDateChange = (taskId, date) => {
        setTaskData((prevData) => ({
        ...prevData,
        [taskId]: { ...prevData[taskId], end_date: date },
        }));
        // You can add logic to update the task's end_date in the database/API here.
    };
  

  // State for AI modal view
  const [aiModal, setAiModal] = useState({
    active: false,
    text: '',
    task: ''
  });

  // Function to fetch AI text
  const fetchAiText = async (taskId, task_name) => {
    // Replace this with your server endpoint for fetching AI text
    setLoadingAi(true);
    try {
        let res = await UserApi.getAiTips(taskId);
        const {tips} = res
        setAiModal({ active: true, text: tips, task: task_name });
        setLoadingAi(false);

    } catch (error) {
      console.error('Error fetching AI text:', error);
    }
  };

  useEffect(() => {
  }, []);

  // Function to close the AI modal view
  const closeAiModal = () => {
    setAiModal({ active: false, text: '' });
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div>
          {loadingAi ? ( // Loading state for the entire modal
            <div>
              <h2>PriorityPilot is charting a course to help navigate this task...</h2>
              <img
                className="Modal-logo-spinner"
                src="https://www.linkedin.com/dms/prv/vid/D5606AQEf51Hume8Srw/messaging-attachmentFile/0/1697545054128?m=AQJTUV7kYLbWhgAAAYs9kmX987emNaO6VjzYNt_vLpwJgNqGN5PUxg0w-g&ne=1&v=beta&t=lh0DfSDwyoloETUzeGufrYOmoAwx9FJ8jiU0MFr8new" // Replace with a spinner image URL
                alt="Loading..."
              />
            </div>
          ) : aiModal.active ? ( // AI modal view
            <div>
              <h2>Here are some tips to navigate "{aiModal.task}"!</h2>
              <ul>
                {aiModal.text.map((tip) => (
                  <li style={{ textAlign: 'left' }}>{tip}</li>
                ))}
              </ul>

              <button onClick={closeAiModal}>Back</button>
            </div>
          ) : ( // Normal task view
            <div>
              <h2>How are things going with these tasks?</h2>
              <table className="table-style">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Task</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>AI Navigation</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksForToday.map((task) => (
                    <tr key={task.id}>
                      <td style={{ textAlign: 'left' }}>{task.project_name}</td>
                      <td style={{ textAlign: 'left' }}>{task.task_name}</td>
                      <td>
                        <DatePicker
                          selected={new Date(taskData[task.id].end_date)}
                          onChange={(date) => handleEndDateChange(task.id, date)}
                          dateFormat="eee, dd MMM yyyy"
                        />
                      </td>
                      <td>
                        <select
                          value={taskData[task.id].status}
                          onChange={(e) => handleStatusChange(task.id, e)}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Complete">Complete</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <img
                          className="Modal-logo"
                          src="https://www.linkedin.com/dms/prv/vid/D5606AQEf51Hume8Srw/messaging-attachmentFile/0/1697545054128?m=AQJTUV7kYLbWhgAAAYs9kmX987emNaO6VjzYNt_vLpwJgNqGN5PUxg0w-g&ne=1&v=beta&t=lh0DfSDwyoloETUzeGufrYOmoAwx9FJ8jiU0MFr8new"
                          onClick={() => fetchAiText(task.id, task.task_name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
