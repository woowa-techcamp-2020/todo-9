# Todo9

투두리스트를 우아하게 구현해보자.

## ✋Team Member

- 남현우
- 홍동욱

## 🥳 Team Introduction

- [Ground Rule](https://github.com/woowa-techcamp-2020/todo-9/wiki/Ground-Rule)

- [Convention](https://github.com/woowa-techcamp-2020/todo-9/wiki/Convention)

- [Scrum](https://github.com/woowa-techcamp-2020/todo-9/wiki/Scrum)

## 😆 Project Structure

```bash
|-- client
    |-- public
        |-- images
        index.html
    |-- src
        |-- apis // api models
        |-- components // UI Components
        |-- styles // scss config & common styles
        |-- utils
            |-- eventHandler // debounce & throttle
            |-- wooact // wooact config
|-- server
    |-- src
        |-- apis // api routes
        |-- config // db config
        |-- middlewares
        |-- schema // models
        |-- utils // util functions
```



## 🏅 Skills

**Frontend**

- Typescript
- scss
- wooact ( VanilaJS로 구현한 Todo 9조의  react )
- Jest

**Backend**

- express
- mysql2
- AWS EC2

## 🏃‍♂️Quick Start

### Clone & Install packages

```bash
git clone https://github.com/woowa-techcamp-2020/todo-9.git

cd client

npm install

cd ../server

npm install
```


### Write db config

write a db config to `server/.env`

```javascript
DB_HOST=HOST IP or Domain
DB_USER=db user name
DB_NAME=database name
DB_PASS=database password
```


### Run server

```bash
cd client

npm run dev

cd ../server

npm run dev
```

Then, you can access to your server http://localhost:9000 or http://127.0.0.1:9000

