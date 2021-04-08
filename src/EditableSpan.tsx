import React from "react";

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = React.useState(false)
    const [title, setTitle] = React.useState('')

    const acivateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disableEditMode = () => {
        setEditMode(false)
    }

    const onChangehandler=(e:any)=>{
        setTitle(e.currentTarget.value)
    }
    return <div>
        {!editMode
            ? <span onDoubleClick={acivateEditMode}>{props.title}</span>
            : <input value={title}
                     onChange={onChangehandler}
                     onBlur={disableEditMode} autoFocus/>
        }
    </div>
}