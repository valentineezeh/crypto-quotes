import { TailSpin } from 'react-loader-spinner';

export const PageLoader = () => {
  return (
    <div className='page-loader'>
      <TailSpin
        visible={true}
        height="150"
        width="150"
        color="white"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}