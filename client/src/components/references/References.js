import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import './Reference.css'
import { useParams, Link } from 'react-router-dom';

function Reference() {

    const { articleId } = useParams();

    const createForm = useRef(null);
    const updateForm = useRef(null)
    const createFormTitle = useRef(null);
    const updateFormTitle = useRef(null)
    const createFormAuthors = useRef(null);
    const updateFormAuthors = useRef(null)
    const createFormStatus = useRef(null);
    const updateFormStatus = useRef(null);
    const updateFormId = useRef(null);

    const [references, setReferences] = useState([]);
    // let references;

    async function getReferences() {
        let referenceResponse = await axios.get(`http://localhost:3001/article/${articleId}/reference`);
        setReferences(referenceResponse.data.references);
    }

    useEffect( () => {
        getReferences();
    }, []);

    async function createReference(event) {
        event.preventDefault();

        const body = {
            "title": createFormTitle.current.value,
            "authors": createFormAuthors.current.value,
            "articleId": articleId,
        }

        const createdReference = await axios.post(`http://localhost:3001/article/${articleId}/reference`, body);

        if(createdReference.data.success === true) {
            createFormStatus.current.innerHTML = "Referinta a fost creat cu succes";
            createForm.current.reset();
            getReferences();
        } else {
            createFormStatus.current.innerHTML = createdReference.data.error;
        }
    }

    async function updateReference(event) {
        event.preventDefault();

        const title = updateFormTitle.current.value;
        const authors = updateFormAuthors.current.value;

        const body = {};

        if(!title == "") {
            Object.assign(body, {"title": title});
        }

        if(!authors == "") {
            Object.assign(body, {"authors": authors});
        }

        const createdReference = await axios.put(`http://localhost:3001/article/${articleId}/reference/${+updateFormId.current.value}`, body);

        if(createdReference.data.success === true) {
            updateFormStatus.current.innerHTML = "Articolul a fost creat cu succes";
            updateForm.current.reset();
            getReferences();
        } else {
            updateFormStatus.current.innerHTML = createdReference.data.error;
        }
    }

    async function deleteReference(refId) {
        const deletedReference = await axios.delete(`http://localhost:3001/article/${articleId}/reference/${+refId}`);

        if(deletedReference.data.success === true) {
            getReferences();
        } else {
            alert(deletedReference.data.error);
        }
    }

    return (
        <div className="container">
            <div className="article_container">
                {references.map((reference) => {
                    return (
                    <div className='article' key={reference.id}>
                        <div className='article-body'>
                            <p className='prop'>{reference.id}</p>
                            <Link to={`/article/${articleId}/reference/${reference.id}`} className='prop'>{reference.title}</Link>
                            <p className='res'>{reference.authors}</p>
                        </div>
                        <button className='delete-article' onClick={() => deleteReference(reference.id)}>
                            X
                        </button>
                    </div>
                    )
                })}
            </div>
            <div className="article_create">
                <form onSubmit={createReference} ref={createForm}>
                    <label htmlFor="createFormTitle">Titlu</label>
                    <input type="text" name="title" id="createFormTitle" ref={createFormTitle}/>
                    <label htmlFor="createFormAuthors">Autori</label>
                    <input type="text" name="authors" id="createFormAuthors" ref={createFormAuthors}/>
                    <input type="submit" value="Submit"/>
                </form>
                <p ref={createFormStatus}></p>
            </div>
            <div className="article_update">
                <form onSubmit={updateReference} ref={updateForm}>
                    <label htmlFor="updateFormId">id</label>
                    <input type="text" name="id" id="updateFormId" ref={updateFormId}/>
                    <label htmlFor="updateFormTitle">Titlu</label>
                    <input type="text" name="title" id="updateFormTitle" ref={updateFormTitle}/>
                    <label htmlFor="updateFormAuthors">Autori</label>
                    <input type="text" name="resume" id="updateFormAuthors" ref={updateFormAuthors}/>
                    <input type="submit" value="Submit"/>
                </form>
                <p ref={updateFormStatus}></p>
            </div>
        </div>
    );
}

export default Reference;