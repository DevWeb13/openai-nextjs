import Image from 'next/image';

export default function Home() {
  return (
    <main className='h-full relative'>
      <div className='fixed bottom-4 left-0 right-0'>
        <form className='p-4 bg-base-200 max-w-lg w-full'>
          <fieldset className='flex gap-4 items-start'>
            <textarea
              className='textarea textarea-primary'
              placeholder='Message'
            />
            <button className='btn btn-primary' />
          </fieldset>
        </form>
      </div>
    </main>
  );
}
