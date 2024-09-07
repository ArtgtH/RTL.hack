# Репозиторий с хакатона RTL.hack


## Локальное развертывание

### Развертывание с помощью docker-compose
Команда:
`docker-compose up --build`

*Должен быть установлен docker и docker-compose*

### Развертывание с помощью make
Развертывание с make
Команда: 
`make build`

*Должен быть установлен docker, docker-compose и утилита make*


## Деплой на сервер

### С помощью ansible
Установить необходимую коллекцию 
`make install-collections` 

Установка docker, docker-compose и git на машину
`make install-git-docker`

Клонирование и запуск репозитория
`make clone-start`

*Должен быть установлен ansible и утилита make*




