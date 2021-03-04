import TestRenderer from 'react-test-renderer';
import PaginationComponent from './Pagination';


describe("PaginationComponent", () => {  
  it("renders correctly when there are very few books", () => {
    const testRenderer = TestRenderer.create(<PaginationComponent bookCount={30} page={1} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it("renders correctly when there are many books", () => {
    const testRenderer = TestRenderer.create(<PaginationComponent bookCount={2500} page={10} />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});