import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

function OneArticle() {
    let { articleId } = useParams();
    const [aId, setArticleId] = useState(articleId);
    const [articleData, setArticleData] = useState([]);
    const errorParagraph = useRef(null);

    useEffect( async () => {
        const article = await axios.get(`http://localhost:3001/article/${+articleId}`);
        if(article.data.success === true) {
            setArticleData(article.data.article);
        } else {
            errorParagraph.current.innerHTML = article.data.error;
        }
    }, []); 

    return (
        <>
            { articleData !== [] && 
                <>
                    <p>Id: {articleData.id}</p>
                    <p>Titlu: {articleData.title}</p>
                    <p>Rezumat: {articleData.resume}</p>
                    <p>Data crearii: {articleData.date}</p>
                    <Link to={`/article/${articleData.id}/references`}>Adauga o noua referinta!</Link>
                </>
            }
            <p ref={errorParagraph}></p>
        </>
    );
}

export default OneArticle;