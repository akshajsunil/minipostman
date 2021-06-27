import { EditorState, basicSetup} from './_snowpack/pkg/@codemirror/basic-setup.js'
import { EditorView,keymap } from './_snowpack/pkg/@codemirror/view.js'
import {json } from './_snowpack/pkg/@codemirror/lang-json.js'
import {defaultTabBinding} from './_snowpack/pkg/@codemirror/commands.js'
export default function setupEditors() {
    const jsonRequestBody = document.querySelector('[data-json-request-body]')
    const jsonResponseBody = document.querySelector('[data-json-response-body]')
    const basicExtentions = [
        basicSetup,
        keymap.of([defaultTabBinding]),
        json(),
        EditorState.tabSize.of(2)
    ]
    
    const requestEditor = new EditorView({
        state: EditorState.create({
            doc: "{\n\t\n}",
            extensions:basicExtentions,
        }),
        parent: jsonRequestBody
    })
        const responseEditor = new EditorView({
        state: EditorState.create({
            doc: '{}',
            extensions:[...basicExtentions,      EditorView.editable.of(false)]
        }),
        parent: jsonResponseBody
    })
    function updateResponseEditor(value)
    {
        responseEditor.dispatch({
            changes:{
                from: 0,
                to: responseEditor.state.doc.length,
                insert: JSON.stringify(value,null,2),
            },
        })
    }
    return {requestEditor,updateResponseEditor}
}