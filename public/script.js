document.getElementById('calculateButton').addEventListener('click', async () => {
    // Получаем значения из полей ввода и заменяем запятые на точки
    const monthlyRate = parseFloat(document.getElementById('monthlyRate').value.replace(',', '.'));
    const workDays = parseFloat(document.getElementById('workDays').value.replace(',', '.'));
    const exchangeRate = parseFloat(document.getElementById('exchangeRate').value.replace(',', '.'));
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value.replace(',', '.'));

    // Выполняем POST-запрос к серверу
    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monthlyRate, workDays, exchangeRate, hoursWorked }),
    });

    const data = await response.json();

    if (response.ok) {
        // Отображаем результаты
        document.getElementById('dailyRate').innerText = `Дневная ставка: $${data.dailyRate.toFixed(2)}`;
        document.getElementById('hourlyRate').innerText = `Часовая ставка: $${data.hourlyRate.toFixed(2)}`;
        document.getElementById('earnedUsd').innerText = `Заработано в $: $${data.earnedUsd.toFixed(2)}`;
        document.getElementById('earnedUah').innerText = `Заработано в грн: ${data.earnedUah.toFixed(2)}`;
    } else {
        // Обработка ошибок
        alert(`Ошибка: ${data.error}`);
    }
});
