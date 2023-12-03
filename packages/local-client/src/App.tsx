import { FC } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { store } from './state/store';
import { Provider } from 'react-redux';
import CellList from './components/CellList/CellList';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
