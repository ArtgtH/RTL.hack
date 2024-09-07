# Шаг 1: Используем Node.js для сборки приложения
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Сборка приложения Vite
RUN npm run build

# Шаг 2: Создаем этап для запуска продакшн-версии приложения
FROM node:18 AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/dist ./dist

# Устанавливаем serve - небольшой сервер для сервировки статических файлов
RUN npm install -g serve

# Открываем порт для доступа к приложению
EXPOSE 5173

# Запускаем сервер для статики на порту 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
