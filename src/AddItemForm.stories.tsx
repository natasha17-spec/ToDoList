import {AddItemForm} from './AddItemForm';
import React from 'react';
import {action} from '@storybook/addon-actions';


export default {
    title:'AddItemForm',
     component:AddItemForm

}


export const AddNewItemFormBasicExample = ()=>{
    // eslint-disable-next-line react/react-in-jsx-scope
    return <AddItemForm addItem={action('addNewItem:')}/>
}