import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './components/app/App';
import References from './components/references/References';
import Article from './components/article/Article';
import reportWebVitals from './reportWebVitals';
import OneArticle from './components/article/OneArticle';
import OneReference from './components/references/OneReference';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App/>}/>
        <Route exact path="/article/:articleId/references" element={<References/>}/> 
        <Route exact path="/article/:articleId/reference/:refId" element={<OneReference/>}/> 
        <Route exact path="/articles" element={<Article/>}/>
        <Route exact path="/article/:articleId" element={<OneArticle/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
