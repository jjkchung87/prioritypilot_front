import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import DatePicker from 'react-datepicker'
import './Forms.css'
import Logo from "../assets/pp_logo.png"
import { Button, Icon, Table } from 'semantic-ui-react'
import AiTipsModal from './AiTipsModal';

function Modal({ closeModal, resetTimer }) {
  const { currentUser } = useContext(UserContext);
  const [showAiModal, setShowAiModal] = useState({status: false, task: null})

  // Function to filter and retrieve tasks that meet the criteria
  const getTasksForToday = () => {
    if (currentUser && currentUser.projects) {
      // Get today's date in "yyyy-mm-dd" format
      const today = new Date().toISOString().split('T')[0]; 
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
  
  const handleClosePoll = () => {
    closeModal()
    resetTimer()
  }

  return (
    <div className="modal-background">
      <div className='modal-content'>
        <Button className='close-window' icon
                onClick={handleClosePoll}
                size="tiny">
          <Icon name="close"></Icon>
        </Button>
        {showAiModal.status && <AiTipsModal task={showAiModal.task} closeModal={()=>setShowAiModal(false)} />}
        {tasksForToday.length > 0 ? (
  <>
    <h2>Time for an update!</h2>
    <Table celled structured className="table-style countdown-modal-table">
      <Table.Header  color='blue'>
        <Table.Row color='blue'>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell>Task</Table.HeaderCell>
          <Table.HeaderCell>Deadline</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>AI Navigation</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasksForToday.map((task) => (
          <Table.Row key={task.id}>
            <Table.Cell className='project-name'>
              {currentUser.projects.filter((p) => p.id === task.project_id)[0].project_name}
            </Table.Cell>
            <Table.Cell>{task.task_name}</Table.Cell>
            <Table.Cell>
              <DatePicker
                selected={new Date(taskData[task.id].end_date)}
                onChange={(date) => handleEndDateChange(task.id, date)}
                dateFormat="eee, dd MMM yyyy"
              />
            </Table.Cell>
            <Table.Cell>
              <select
                value={taskData[task.id].status}
                onChange={(e) => handleStatusChange(task.id, e)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </Table.Cell>
            <Table.Cell style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <img
                className="Modal-logo"
                src={Logo}
                alt='PriorityPilot_Logo'
                onClick={() => setShowAiModal({ status: true, task: task })}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
) : (
  <h2>You are doing great! No tasks are due today!</h2>
)}

        </div>
      </div>
    )  
}

export default Modal
