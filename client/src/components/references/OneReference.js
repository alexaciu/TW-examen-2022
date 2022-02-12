import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function OneReference() {
    let { articleId, refId } = useParams();
    const [refData, setRefData] = useState([]);
    const errorParagraph = useRef(null);

    useEffect( async () => {
        const reference = await axios.get(`http://localhost:3001/article/${+articleId}/reference/${refId}`);
        if(reference.data.success === true) {
            setRefData(reference.data.reference);
        } else {
            errorParagraph.current.innerHTML = reference.data.error;
        }
    }, []); 

    return (
        <>
            { refData != [] && 
                <>
                    <p>Id: {refData.id}</p>
                    <p>Titlu: {refData.title}</p>
                    <p>Rezumat: {refData.authors}</p>
                    <p>Data crearii: {refData.date}</p>
                </>
            }
            <p ref={errorParagraph}></p>
        </>
    );
}

export default OneReference;