# Typescript practice with React, Redux, Websocket and Firebase
Apply Typescript in React, Redux app to build a chat app realtime with websocket

## Targets
* Apply Typescript
* Apply React, Redux
* Apply Websocket IO
* Build simple server with Express and Websocket
* Redux Saga
* Test app with Jest + Enzyme
* Apply Firebase authentication

## [Directory structure](https://www.evernote.com/l/AcOHwTr6jDxF96su5HguG0PO6DTLL59m9v0)
```
|- client/
|-  |   |- public/
|-  |      |- favicon.ico
|-  |      |- index.html
|-  |      |- manifest.json
|-  |   |- src/
|-  |      |- app
|-  |         |- auth/
|-  |            |- components/
|-  |            |- containers/
|-  |            |- redux/
|-  |            |- sagas/
|-  |         |- chat-app/
|-  |            |- components/
|-  |               |- styles/
|-  |                  |- ChapApp.css
|-  |               |- test/
|-  |               |- ...
|-  |            |- containers/
|-  |               |- test/
|-  |               |- ChatApp.tsx
|-  |            |- redux/
|-  |               |- test/
|-  |               |- ...
|-  |            |- sagas/
|-  |               |- test/
|-  |               |- connectSocketSuccessSaga.tsx
|-  |               |- socketSaga.tsx
|-  |         |- chat-system/
|-  |            |- components/
|-  |            |- containers/
|-  |            |- redux/
|-  |            |- sagas/
|-  |         |- user-list/
|-  |            |- components/
|-  |            |- containers/
|-  |            |- redux/
|-  |            |- sagas/
|-  |      |- common
|-  |         |- components
|-  |            |- test/
|-  |            |- Modal.tsx
|-  |      |- config
|-  |         |- connectSocket.js
|-  |         |- rootResucer.tsx
|-  |         |- rootSaga.tsx
|-  |      |- constants/
|-  |      |- store/
|-  |      |- types/
|-  |      |- utils/
|-  |      |- index.css
|-  |      |- index.tsx
|-  |      |- logo.svg
|-  |      |- registerServiceWorker.ts
|-  |      |- setupTests.ts
|-  |   |- .env
|-  |   |- .gitignore
|-  |   |- package.json
|-  |   |- README.md
|-  |   |- tsconfig.json
|-  |   |- tsconfig.prod.json
|-  |   |- tsconfig.test.json
|-  |   |- tslint.json
|-  |   |- yarn.lock
|-  |   |- images.d.ts
|-  |   |- reduxsauce.d.ts

|- server/
|-  |   |- src/
|-  |      |- model/
|-  |         |- index.ts
|-  |         |- message.ts
|-  |         |- user.ts
|-  |      |- chat-server.ts
|-  |      |- index.ts
|-  |   |- .gitignore
|-  |   |- gulpfile.js
|-  |   |- package-lock.json
|-  |   |- package.json
|-  |   |- tsconfig.json
|-  |   |- webpack.config.js
|-  |   |- yarn.lock
|- README.md
```

## Technologies
### Front-end
* [Typescript](typescriptlang.org)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Reduxsauce](https://github.com/infinitered/reduxsauce)
* [Redux-saga](https://redux-saga.js.org/)
* [socket IO Client](https://socket.io/docs/client-api/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Redux Saga Firebase](https://redux-saga-firebase.js.org/)
* [Firebase Authentication](https://firebase.google.com/docs/auth/?gclid=EAIaIQobChMI7frvx9O_3wIVyg0rCh0IYw7JEAAYASADEgKPN_D_BwE)
### Backend
* [Express](https://expressjs.com/)
* [Socket IO Server](https://socket.io/docs/server-api/)
### Testing
* [Jest](https://jestjs.io/) + [Enzyme](https://airbnb.io/enzyme/)

## Editor
* [Visual Studio Code](https://code.visualstudio.com/)

## Guideline for Running
* Clone source from repository git@gitlab.asoft-python.com:g-thanhnguyendiem/react-training.git
* Checkout branch `feature/chat-app`
* Go to folder app:
* `cd Typescript/app-chat/`
* Create file .env then put content from [this link](https://bit.ly/2LAFjbd) to it
* Run server app
    * `cd server/`
    * `npm install`
    * `npm start`
* Run client app
    * `cd client/`
    * `npm install`
    * `npm start`
* Run test for client app
    * `npm run test`
* Run test with coverage
    * `npm run test:coverage`

## Running browser site
Start with [http://localhost:3000](http://localhost:3000)

## How to test app feature, please read it to aware of bugs app
* Authentication
    * First time, you will see Landing page
    * Let go to sign up a account by email and password
    * After login success, app auto redirect to home page and add you to the room. It also get list user and list messages to show up
    * You can do log out by hover on avatar on header then click button "log out"
    * You can update your profile by hover on avatar then click button "edit profile" to go to page profile and to update the name, then click button "Update Profile".
    * You can login by account you regist before
    * Some note:
        * Go to page sign up from login page and reverve will redirect to landing page is a [known issue](https://gitlab.asoft-python.com/g-thanhnguyendiem/react-training/issues/84)
        * Once app get error return from response, app show error and crack - [known issue](https://gitlab.asoft-python.com/g-thanhnguyendiem/react-training/issues/82)
        * [known issue in flow edit profile](https://gitlab.asoft-python.com/g-thanhnguyendiem/react-training/issues/83)
* App basic
    * View list user
    * View list message
    * Submit chat message
* Realtime app chat
    * Open  Incognito Window then sign up and login to another account
    * Submit some message from 2 accounts then see it sync automatically. It's call realtime


## Known Issue
- Still use any to avoid error typescript type checking even know it not good
- Error message still use string literals, should define combo constant variable for them
- Still not clear about Router and history
- Dump style css coding
- Some function in test file call more then expect but temporary comment it, just test it have been called first
- Miss storybook for app
- Test have low percent coverage and stil not fix bug of Route on test

## Nice points I collected
- Way to handle error, loading by redux file, not mix to other component
- Test redux saga with plan module quite easy
- Understand diff about socket and realtimeDB in basic
- Touch on Firebase a bit


## References
- [Main practice document](https://bit.ly/2ERV4dx)

