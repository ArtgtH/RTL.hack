# Репозиторий с хакатона RTL.hack


## Локальное развертывание

### Развертывание с помощью docker-compose

`docker-compose up --build`

### Развертывание с помощью make

`make build`



## Деплой на сервер

### С помощью ansible
Установить необходимую коллекцию 
`make install-collections` 

Установка docker, docker-compose и git на машину
`make install-git-docker`

Клонирование и запуск репозитория
`make clone-start`



