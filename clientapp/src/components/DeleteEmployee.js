import React, { useState } from "react";

function DeleteEmployee() {
    const [employeeId, setEmployeeId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!employeeId) {
            setStatusMessage('Пожалуйста, введите ID сотрудника');
            setIsSuccess(false);
            return;
        }

        try {
            const response = await fetch(`/api/Employee/remove/${employeeId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении сотрудника. Статус: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setStatusMessage(result.message || 'Сотрудник успешно удалён');
            setIsSuccess(true);
            setEmployeeId('');
        } catch (error) {
            console.error('Ошибка', error);
            setStatusMessage('Ошибка при удалении сотрудника: ' + error.message);
            setIsSuccess(false);
        }
    };

    return(
        <div>
            <h2>Удаление сотрудника</h2>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Введите ID сотрудника"
                />
                <button type="submit">Удалить</button>
            </form>
            {statusMessage && <p style={{ color: isSuccess ? 'green' : 'red' }}>{statusMessage}</p>}
        </div>
    );
}

export default DeleteEmployee;