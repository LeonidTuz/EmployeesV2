import React, { useState } from 'react';

function EmployeeSearchById() {
    const [searchTerm, setSearchTerm] = useState('');
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setEmployee(null);

        try {
            const isNumeric = !isNaN(searchTerm) && !isNaN(parseFloat(searchTerm));
            if (!isNumeric) {
                setError('Пожалуйста, введите корректный ID сотрудника');
                setIsLoading(false);
                return;
            }

            const response = await fetch(`/api/Employee/employeById/${searchTerm}`);
            if (!response.ok) {
                throw new Error(`Не удалось получить данные сотрудника. Статус ответа: ${response.status}`);
            }
            if (response.status === 204) {
                setError(`Сотрудник с ID ${searchTerm} не найден.`);
            }

            const data = await response.json();
            if (!data) {
                setError(`Сотрудник не найден.`);
            } else {
                setEmployee(data);
            }
        } catch (error) {
            console.error('Ошибка при получении данных сотрудника:', error);
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
                    placeholder="Введите ID сотрудника"
                />
                <button type="submit">Поиск</button>
            </form>

            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error}</p>}
            {!isLoading && !error && employee && (
                <div>
                    <p>Имя: {employee.firstName}</p>
                    <p>Фамилия: {employee.lastName}</p>
                    <p>Должность: {employee.position}</p>
                    <p>Начало работы: {employee.startDate}</p>
                    <p>{employee.workDuration}</p>
                </div>
            )}
        </div>
    );
}

export default EmployeeSearchById;