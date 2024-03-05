import React, { useState } from 'react';

function UpdateEmployee() {
    const [employeeId, setEmployeeId] = useState('');
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        firstName: null,
        lastName: null,
        position: null,
        startDate: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchEmployeeData = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/Employee/employeById/${employeeId}`);
            if (!response.ok) {
                throw new Error('Ошибка при получении данных сотрудника');
            }

            const data = await response.json();
            setEmployeeInfo(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value || null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const payload = Object.keys(employeeData).reduce((acc, key) => {
            if (employeeData[key] !== null) {
                acc[key] = employeeData[key];
            }
            return acc;
        }, { id: employeeId });

        try {
            const response = await fetch('/api/Employee/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении данных');
            }
            setSuccess('Данные успешно обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Введите ID сотрудника"
                onBlur={fetchEmployeeData}
            />
            {isLoading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {employeeInfo && (
                <div>
                    <p>Имя: {employeeInfo.firstName}</p>
                    <p>Фамилия: {employeeInfo.lastName}</p>
                    <p>Должность: {employeeInfo.position}</p>
                    <p>Дата начала работы: {employeeInfo.startDate}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={employeeData.firstName || ''}
                    onChange={handleChange}
                    placeholder="Новое имя"
                />
                <input
                    type="text"
                    name="lastName"
                    value={employeeData.lastName || ''}
                    onChange={handleChange}
                    placeholder="Новая фамилия"
                />
                <input
                    type="text"
                    name="position"
                    value={employeeData.position || ''}
                    onChange={handleChange}
                    placeholder="Новая должность"
                />
                <input
                    type="date"
                    name="startDate"
                    value={employeeData.startDate || ''}
                    onChange={handleChange}
                    placeholder="Дата начала работы"
                />
                <button type="submit">Обновить данные</button>
            </form>
        </div>
    );
}

export default UpdateEmployee;