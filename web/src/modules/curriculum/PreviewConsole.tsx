import React from "react";
import {UnControlled as CodeMirror} from 'react-codemirror2'

export const PreviewConsole = (props) => {

    return (
        <div>
            <h3>Console output</h3>
                <CodeMirror
                    value={props.output}
                    options={{
                        mode: 'none',
                        theme: 'default',
                        lineNumbers: true,
                        readOnly: true
                    }}
                    className="console"
                />
        </div>
    )
}