import React, {useEffect, useState} from "react";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/Employee/all');
                if (!response.ok) {
                    throw new Error('Произошла ошибка при получении сотрудников');
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Ошибка', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Список сотрудников</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        id-{employee.id}, {employee.firstName} {employee.lastName} - {employee.position},
                        работает с {employee.startDate} {employee.workDuration ? `, ${employee.workDuration}` : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeList;