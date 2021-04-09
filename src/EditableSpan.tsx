import React from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = React.useState(false)
    const [title, setTitle] = React.useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disableEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler=(e:any)=>{
        setTitle(e.currentTarget.value)
    }
    return <div>
        {!editMode
            ? <span onDoubleClick={activateEditMode}>{props.title}</span>
            : <input value={title}
                     onChange={onChangeHandler}
                     onBlur={disableEditMode} autoFocus/>
        }
    </div>
}