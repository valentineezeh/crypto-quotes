import "@testing-library/jest-dom";
import { screen } from '@testing-library/react'
import { cleanup, renderApollo} from './utils';
import { Input } from '../component/common/Input'

const props = {
  errorsMsg: 'error message',
  register: jest.fn()
}

describe('It should render Form component', () => {
  afterEach(cleanup)
  it("renders without error", async () => {
    renderApollo(<Input {...props}  />, { mocks: [] });
    expect(await screen.findByText("Enter your email:")).toBeInTheDocument();
  });
})