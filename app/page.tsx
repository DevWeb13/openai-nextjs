'use client';

import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const formData = new FormData(event.currentTarget);

    const prompt = formData.get('prompt') as string;

    setLoading(true);
    setHtmlCode('');

    const result = await fetch('/api/tailwind', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });

    const body = result.body as ReadableStream;

    if (!body) {
      alert('No response from server');
      setLoading(false);
      return;
    }

    const reader = body.getReader();

    const readChunk = async () => {
      const { done, value } = await reader.read();

      if (done) {
        // terminé
        return;
      }

      const chunk = new TextDecoder().decode(value);
      setHtmlCode((prevHtmlCode) => prevHtmlCode + chunk);
      await readChunk();
    };

    await readChunk();
  };

  return (
    <main className='h-full relative'>
      {loading && (
        <div className='absolute top-4 left-0 right-0 flex items-center justify-center'>
          <progress className='progress w-56' />
        </div>
      )}

      <pre>{htmlCode}</pre>

      <div className='fixed bottom-4 left-0 right-0 flex items-center justify-center'>
        <form
          className='p-4 bg-base-200 max-w-lg w-full'
          onSubmit={handleSubmit}>
          <fieldset className='flex gap-4 items-start'>
            <textarea
              name='prompt'
              className='w-full textarea textarea-primary'
              placeholder='Message'
            />
            <button
              className='btn btn-primary btn-sm'
              type='submit'>
              <Sparkles size={20} />
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
