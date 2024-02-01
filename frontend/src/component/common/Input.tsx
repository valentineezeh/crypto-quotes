import { UseFormRegister } from 'react-hook-form'
import { InputType } from '../Form'

type PropType = {
  register: UseFormRegister<InputType>
  errorsMsg: string
}

export const Input = ({ register, errorsMsg }: PropType) => {

  return (
    <div>
      <label htmlFor="email">Enter your email: </label>
      <input
        type="email"
        placeholder="Your email.."
        {...register('email', { required: 'Email is required' , pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: 'Invalid email address',
        },
     })}
        />
        {
          errorsMsg && (
            <p role='alert' className='error'>{errorsMsg}</p>
          )
        }
    </div>
  )
}