import React, {useState} from "react";

function EmployeeForm(){
    const [employee, setEmployee] = useState({ firstName: '', lastName: '', position: '', startDate: '' });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSuccess(null);
        setStatusMessage('');
        try {
            const response = await fetch('/api/Employee/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });

            if(!response.ok) {
                throw new Error('Произошла ошибка при отправке данных');
            }

            const result = await response.json();
            console.log("Сохраняю данные сотрудника", result);
            setEmployee({ firstName: '', lastName: '', position: '', startDate: '' });
            setIsSuccess(true);
            setStatusMessage('Сотрудник успешно добавлен!');
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            setIsSuccess(false);
            setStatusMessage('Ошибка при отправке данных: ' + error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       value={employee.firstName}
                       onChange={(e) => setEmployee({...employee, firstName: e.target.value})}
                       placeholder="Имя"
                       required/>
                <input type="text"
                       value={employee.lastName}
                       onChange={(e) => setEmployee({...employee, lastName: e.target.value})}
                       placeholder="Фамилия"
                       required/>
                <input type="text"
                       value={employee.position}
                       onChange={(e) => setEmployee({...employee, position: e.target.value})}
                       placeholder="Должность"
                       required/>
                <input type="date"
                       value={employee.startDate}
                       onChange={(e) => setEmployee({...employee, startDate: e.target.value})}
                       placeholder="Дата начала работы"
                       required/>
                <button type="submit">Добавить сотрудника</button>
            </form>
            {statusMessage && <p style={{color: isSuccess ? 'green' : 'red'}}>{statusMessage}</p>}
        </div>
    );
}

export default EmployeeForm;