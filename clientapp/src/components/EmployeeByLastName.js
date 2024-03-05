import React, { useState } from 'react';

function EmployeeSearchByLastName() {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setEmployees([]);

        try {
            if (!searchTerm) {
                setError('Пожалуйста, введите фамилию сотрудника');
                setIsLoading(false);
                return;
            }

            const response = await fetch(`/api/Employee/employeByLastName/${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error(`Не удалось получить данные сотрудника(ов). Статус ответа: ${response.status}`);
            }
            const data = await response.json();
            if (!data || data.length === 0) {
                setError('Сотрудник(и) с такой фамилией не найден(ы).');
            } else {
                setEmployees(data);
            }
        } catch (error) {
            console.error('Ошибка при получении данных сотрудника(ов):', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Введите фамилию сотрудника"
                />
                <button type="submit">Поиск</button>
            </form>

            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}
            {!isLoading && !error && employees.length > 0 && (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            {employee.firstName} {employee.lastName} - {employee.position},
                            начало работы: {employee.startDate},
                            {employee.workDuration && ` Продолжительность работы: ${employee.workDuration}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EmployeeSearchByLastName;