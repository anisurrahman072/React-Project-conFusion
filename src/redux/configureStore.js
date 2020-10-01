// In this file i am creating Redux-Store
import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );
    return store;
}
