import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  SelectInput,
  Input,
} from './common'
import { GET_CRYPTO_CURRENCIES,  SUBSCRIBE_FOR_CRYPTO_QUOTES } from '../queries'


export type InputType = {
  email: string
}

export type SelectedOptionsProps = {
  value: number;
  error: boolean;
  name: string;
  symbol: string
}

const initialState = {
  value: 0,
  error: false,
  name: '',
  symbol: ''
}


export const Form = () => {
  const [selectedOption, setSelectedOption] = useState<SelectedOptionsProps>(initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InputType>()

  const { data: cryptoData } = useQuery(GET_CRYPTO_CURRENCIES,{
    fetchPolicy: 'cache-first'
  })

  const [ subscribeToCryptoQuotes, { loading } ] = useMutation(SUBSCRIBE_FOR_CRYPTO_QUOTES)

  const options = cryptoData?.cryptoCurrencies?.data || []

  return (
    <form onSubmit={handleSubmit((data) => {
      if (selectedOption.value === 0) {
        setSelectedOption({
          ...selectedOption,
          error: true
        })
      } else {
        setSelectedOption({
          ...selectedOption,
          error: false
        })
        subscribeToCryptoQuotes({
          variables: {
            email: data?.email,
            subscribeForCryptoQuotesId: String(selectedOption.value)
          },
          onCompleted: (data) => {
            const message = data.subscribeForCryptoQuotes.message
            if(!data.subscribeForCryptoQuotes.success) {
              toast.error(message)
            } else{
              toast.success(message)
              setSelectedOption(initialState)
              reset({email: ''})
            }
          },
          onError: (error) => {
            toast.error(error.message)
          },
        })
      }
    })}>
      <Input register={register} errorsMsg={errors?.email?.message ?? ''} />
      <SelectInput
        options={options}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        error={selectedOption.error ? 'This field is required': ''}
      />
      <button className='button'>
        {
          loading ? (
            <div className='spinner-container'>
              <div className="spinner" />
            </div>
              ) : 'Submit'
        }
      </button>

    </form>
  )
}