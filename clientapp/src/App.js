import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeById from './components/EmployeeById';
import DeleteEmployee from './components/DeleteEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeByLastName from './components/EmployeeByLastName';

function App() {
  const [action, setAction] = useState('');
  return (
      <div className="App">
        <h1>ITCS</h1>
        <h2>Что вы хотите сделать?</h2>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="add">Добавить сотрудника</option>
          <option value="getAll">Посмотреть всех сотрудников</option>
          <option value="getOneById">Найти сотрудника по id</option>
          <option value="getByLastName">Найти сотрудника по фамилии</option>
          <option value="delete">Удалить сотрудника</option>
          <option value="update">Изменить данные сотрудника</option>
        </select>

        {action === 'add' && <EmployeeForm/>}
        {action === 'getAll' && <EmployeeList/>}
        {action === 'getOneById' && <EmployeeById/>}
        {action === 'delete' && <DeleteEmployee/>}
        {action === 'update' && <UpdateEmployee/>}
        {action === 'getByLastName' && <EmployeeByLastName/>}
      </div>
  );
}

export default App;
