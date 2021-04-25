import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


export default {
    title:'addNewTask',
    component:EditableSpan
}
const onTitleChangeHandler = action('Value Changed');

export const EditableSpanForExample = (props:any) =>{
    return (
        <>
            <EditableSpan value={'Start value'} onChange={onTitleChangeHandler}/>
        </>
    )

}
