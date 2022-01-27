import React from "react";
import ReactMarkdown from "react-markdown";


export const ArticleDisplay = (props) => {
    return (
        <div>
            <ReactMarkdown>
                {props.markdown}
            </ReactMarkdown>
        </div>
    )
}