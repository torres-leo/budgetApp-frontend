import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm';

function ConfirmAccountPage() {
  return (
    <>
      <h1 className='font-bold text-5xl text-purple-950 mb-6'>Confirm account</h1>
      <p className='text-xl font-bold mb-10'>
        Fill the boxes with the code that you received by  {''}
        <span className='text-amber-500'>email</span>
      </p>

      <ConfirmAccountForm />
    </>
  );
}

export default ConfirmAccountPage;
