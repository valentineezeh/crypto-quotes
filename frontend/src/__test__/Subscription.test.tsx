import { screen } from '@testing-library/react';
import SubscriptionPage from '../pages/SubscriptionPage';
import { cleanup, renderApollo} from './utils';
import { mocks } from './mock'


describe('Render Subscription page', () => {
  afterEach(cleanup)
  it('should render the subscription component', async() => {
    renderApollo(<SubscriptionPage />, {mocks, addTypename: false, resolvers: {}});

    const mainElement = await screen.findByTestId('subscription')
    expect(mainElement).toBeInTheDocument();
  })
})