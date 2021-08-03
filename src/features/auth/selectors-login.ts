import {AppRootStateType} from '../../app/store';

export const selectorIsLoggedIn =  (state:AppRootStateType) => state.auth.isLoggedIn;