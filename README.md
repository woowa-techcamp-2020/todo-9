# Todo9

<p align="center"> <img src="https://images.velog.io/images/naamoonoo/post/afb6e6fb-f06a-4140-b8ed-7b3d6dca3a4a/image.png"/> </p>

이 프로젝트는 우아하게 투두리스트를 구현하는 것을 목표로 했습니다. 드래그 앤 드랍을 마우스 이벤트를 통해 직접 구현하는 우아한 테크닉과 리액트 라이브러리를 따라 만든 `wooact`로 코드의 가독성을 올리고, 모듈화를 통해 재사용성을 극대화 했습니다. EC2 서버를 이용해서 mysql db를 이용했고, express 기반의 심플한 서버를 구축하였습니다. 또한 Typescript의 도입과 TDD, 페어 프로그래밍을 통해 협업의 효율성을 높이는 전략을 바탕으로 프로젝트를 진행헀습니다. 

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

