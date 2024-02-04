import { screen } from '@testing-library/react';
import App from '../App';
import { cleanup, renderApollo} from './utils';
import { mocks } from './mock'


describe('Render App', () => {
  afterEach(cleanup)
  it('renders the app component', async() => {
    renderApollo(<App />, {mocks, addTypename: false, resolvers: {}});

    const mainElement = await screen.findByTestId('main')
    expect(mainElement).toBeInTheDocument();
  })
})
