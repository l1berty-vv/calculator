const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Настройка для обслуживания статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Обработка POST-запроса на /calculate
app.post('/calculate', (req, res) => {
    const { monthlyRate, workDays, exchangeRate, hoursWorked } = req.body;

    // Проверка входных данных
    if (isNaN(monthlyRate) || isNaN(workDays) || isNaN(exchangeRate) || isNaN(hoursWorked)) {
        return res.status(400).json({ error: 'Некорректные входные данные' });
    }

    // Вычисления
    const dailyRate = monthlyRate / workDays;
    const hourlyRate = dailyRate / 10;
    const earnedUsd = hoursWorked * hourlyRate;
    const earnedUah = earnedUsd * exchangeRate;

    // Возвращаем результаты
    res.json({ dailyRate, hourlyRate, earnedUsd, earnedUah });
});

// Обработка GET-запроса для возвращения index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});
