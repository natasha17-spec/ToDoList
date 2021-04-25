import React from 'react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';


export default {
    title: 'AppWithReduxStories',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

export const AppWithReduxStories = (props: any) => {
    return (
        <>
            <AppWithRedux/>
        </>
    )

}
