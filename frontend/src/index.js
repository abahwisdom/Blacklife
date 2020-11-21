import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.scss'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';


var firebaseConfig = {
  apiKey: 'AIzaSyCDJDgkM5idW_DRXtRvZr_7VoMGaw4EXNM',
  authDomain: "index-project-b3fa2.firebaseapp.com",
  databaseURL: "https://index-project-b3fa2.firebaseio.com",
  projectId: "index-project-b3fa2",
  storageBucket: "index-project-b3fa2.appspot.com",
  messagingSenderId: "1038315542665",
  appId: "1:1038315542665:web:0ea864b8a7565de2b68e58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


