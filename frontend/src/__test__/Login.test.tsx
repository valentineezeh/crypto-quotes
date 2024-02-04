import { fireEvent, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { cleanup, renderApollo} from './utils';
import { mocks } from './mock'
import { Login } from '../component/Login'

describe('Render Login Page', () => {
  afterEach(cleanup)
  it('renders learn react component', async() => {
    renderApollo(
      <GoogleOAuthProvider clientId='1234'>
        <Login />
      </GoogleOAuthProvider>
      , {mocks, addTypename: false, resolvers: {}});

    const mainElement = await screen.findAllByText('Login with GMail')
    expect(mainElement).toHaveLength(1);
  })
  xit('should send  a GraphQL mutation to login the user when clicking on "login" button', async ()=>{

    renderApollo(
      <GoogleOAuthProvider clientId='1234'>
        <Login />
      </GoogleOAuthProvider>
    , {mocks, addTypename: false, resolvers: {}})

    const submitButton = await screen.findByTestId('login-button')
    fireEvent.click(submitButton);

    // expect(toast.success).toHaveBeenCalledWith('Welcome to Crypto Quotes')

    // Wait for the mutation to complete
    // await waitFor(() => {
    //   expect(mockChangeLocation).toHaveBeenCalledWith('/crypto-quotes');
    // });
})
})