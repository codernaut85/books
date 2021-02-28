import TestRenderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import Home from './index';

const mockStore = configureStore([]);

describe("Home", () => {  
  it("renders the simple home screen correctly", () => {
    const store = mockStore({
      books: {
        books: [],
        count: 0
      }
    });

    const testRenderer = TestRenderer.create(<Router>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>);
    
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});