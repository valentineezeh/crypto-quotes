import "@testing-library/jest-dom";
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { Form } from '../component/Form'
import { cleanup, renderApollo} from './utils';
import { mocks } from './mock'
import LargeSelect from "../component/common/Dropdown";


describe ('Form', () => {
  afterAll(cleanup)
  const renderComponent = async () => {
    return renderApollo(<Form />, {mocks, addTypename: false,})
  };
  it('should render the form with email and select inputs', async () => {
    renderComponent();

    const emailInput = await screen.findByTestId('email')
    const selectInput = await screen.findByTestId('select-dropdown')
    const submitButton = await screen.findByText('Submit')

    expect(emailInput).toBeInTheDocument()
    expect(selectInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should call the subscribeForCryptoQuotes mutation when the form is submitted', async () => {
    renderComponent();

    let selectedValue = '';

    render(
      <LargeSelect
      options={[{ id: 1, name: 'Bitcoin', symbol: 'BTC' }]}
      setSelectedOption={() => {}}
      selectedOption={{ value: 1, name: 'Bitcoin', symbol: 'BTC', error: false }}
      setValue={(value) => { selectedValue = value; }}
      error=''
    />
    )

    const emailInput = await screen.findByTestId('email')
    const selectInput = await screen.findAllByTestId('select-dropdown')
    const submitButton = await screen.findByText('Submit')

    expect(selectInput).toHaveLength(2);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(selectInput[1]);
    fireEvent.click(submitButton);


    const option = await screen.findByTestId('listItem');
    await waitFor(async () => {
      await fireEvent.click(option);
    })

    expect(selectedValue).toBe('1');

    expect(mocks[1].result).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "subscribeForCryptoQuotes": Object {
              "message": "Subscription successful",
              "success": true,
            },
          },
        }
      `)
  })

  it('Should return an error when email is not inputted', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Submit'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Email is required');
  });

  it('Clicking outside the select component should close it', () => {
    renderComponent();
    fireEvent.click(document.body);
    expect(screen.queryByTestId('.dropDown-option')).not.toBeInTheDocument();
  });

  it('should display an error message if the form is submitted without selecting a crypto currency', async () => {
    renderComponent();

    const emailInput = await screen.findByTestId('email')
    const submitButton = await screen.findByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    expect(await screen.findByText('This field is required')).toBeInTheDocument()
  })
})
