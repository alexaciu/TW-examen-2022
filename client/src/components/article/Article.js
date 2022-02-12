import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Article.css'

function Article() {

    const createForm = useRef(null);
    const updateForm = useRef(null)
    const createFormTitle = useRef(null);
    const updateFormTitle = useRef(null)
    const createFormRes = useRef(null);
    const updateFormRes = useRef(null)
    const createFormStatus = useRef(null);
    const updateFormStatus = useRef(null);
    const updateFormId = useRef(null);

    const sortTitle = useRef(null);
    const sortDate = useRef(null);
    const sort = useRef(null);
    const page = useRef(null);
    const perPage = useRef(null);

    const [articles, setArticles] = useState([]);

    async function getArticles() {
        let articleResponse = await axios.get("http://localhost:3001/article");
        setArticles(articleResponse.data.articles);
    }

    async function getSortedArticles(event) {
        event.preventDefault();

        const title = sortTitle.current.value;
        const date = sortDate.current.value;

        const params = {};

        if(!title == "") {
            Object.assign(params, {"title": title});
        }

        if(!date == "") {
            Object.assign(params, {"date": new Date(date)});
        }

        Object.assign(params, {"sort": sort.current.value});

        const pg = page.current.value ? page.current.value : 1;
        const perpg = perPage.current.value ? perPage.current.value : 100;

        Object.assign(params, {"page": pg});
        Object.assign(params, {"perPage": perpg});

        let articleResponse = await axios.get(`http://localhost:3001/article`, { params: params});
        setArticles(articleResponse.data.articles);
    }

    useEffect( () => {
        getArticles();
    }, []);

    async function createArticle(event) {
        event.preventDefault();

        const body = {
            "title": createFormTitle.current.value,
            "resume": createFormRes.current.value,
        }

        const createdArticle = await axios.post("http://localhost:3001/article", body);

        if(createdArticle.data.success === true) {
            createFormStatus.current.innerHTML = "Articolul a fost creat cu succes";
            createForm.current.reset();
            getArticles();
        } else {
            createFormStatus.current.innerHTML = createdArticle.data.error;
        }
    }

    async function updateArticle(event) {
        event.preventDefault();

        const title = updateFormTitle.current.value;
        const resume = updateFormRes.current.value;

        const body = {};

        if(!title == "") {
            Object.assign(body, {"title": title});
        }

        if(!resume == "") {
            Object.assign(body, {"resume": resume});
        }

        const createdArticle = await axios.put(`http://localhost:3001/article/${+updateFormId.current.value}`, body);

        if(createdArticle.data.success === true) {
            updateFormStatus.current.innerHTML = "Articolul a fost creat cu succes";
            updateForm.current.reset();
            getArticles();
        } else {
            updateFormStatus.current.innerHTML = createdArticle.data.error;
        }
    }

    async function deleteArticle(articleId) {
        const deletedArticle = await axios.delete(`http://localhost:3001/article/${+articleId}`);

        if(deletedArticle.data.success === true) {
            getArticles();
        } else {
            alert(deletedArticle.data.error);
        }
    }

    return (
        <div className="container">
            <div className="article_container">
                <form onSubmit={getSortedArticles}>
                    <label>Filtrare:</label>
                    <label htmlFor='sortTitle'>Titlu:</label>
                    <input type="text" name="sortTitle" id='sortTitle' ref={sortTitle}/>
                    <label htmlFor='sortDate'>Data:</label>
                    <input type="datetime-local" name="sortDate" id='sortDate' ref={sortDate}/>
                    <label>Sortare:</label>
                    <select name="sort" id="sort" ref={sort}>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                    <label>Paginare:</label>
                    <label htmlFor='page'>Pagina:</label>
                    <input type="number" name="page" id="page" ref={page}/>
                    <label htmlFor='perPage'>Per pagina:</label>
                    <input type="number" name="perPage" id="perPage" ref={perPage}/>
                    <input type="submit" value="Sorteaza"/>
                </form>
                {articles.map((article) => {
                    return (
                    <div className='article' key={article.id}>
                        <div className='article-body'>
                            <p className='prop'>{article.id}</p>
                            <Link to={`/article/${article.id}`} className='prop'>{article.title}</Link>
                            <p className='res'>{article.resume}</p>
                        </div>
                        <button className='delete-article' onClick={() => deleteArticle(article.id)}>
                            X
                        </button>
                    </div>
                    )
                })}
            </div>
            <div className="article_create">
                <form onSubmit={createArticle} ref={createForm}>
                    <label htmlFor="createFormTitle">Titlu</label>
                    <input type="text" name="title" id="createFormTitle" ref={createFormTitle}/>
                    <label htmlFor="createFormRes">Rezumat</label>
                    <input type="text" name="resume" id="createFormRes" ref={createFormRes}/>
                    <input type="submit" value="Submit"/>
                </form>
                <p ref={createFormStatus}></p>
            </div>
            <div className="article_update">
                <form onSubmit={updateArticle} ref={updateForm}>
                    <label htmlFor="updateFormId">id</label>
                    <input type="text" name="id" id="updateFormId" ref={updateFormId}/>
                    <label htmlFor="updateFormTitle">Titlu</label>
                    <input type="text" name="title" id="updateFormTitle" ref={updateFormTitle}/>
                    <label htmlFor="updateFormRes">Rezumat</label>
                    <input type="text" name="resume" id="updateFormRes" ref={updateFormRes}/>
                    <input type="submit" value="Submit"/>
                </form>
                <p ref={updateFormStatus}></p>
            </div>
        </div>
    );
}

export default Article;