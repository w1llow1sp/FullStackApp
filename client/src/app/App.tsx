import { Provider } from 'react-redux';
import { store } from './store';
import { UsersPage } from '../pages/UsersPage/ui/UsersPage';

export const App = () => {
    return (
        <Provider store={store}>
            <UsersPage />
        </Provider>
    )
}
