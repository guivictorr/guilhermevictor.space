import Link from 'next/link';

export const Article = () => (
  <li>
    <Link
      href='/writing/testing'
      className='transition-colors hover:text-primary focus:text-primary py-2 block w-fit'
    >
      <div className='flex items-center gap-1'>
        <p className='sm:text-xl font-bold'>post title</p>
        <p>2023</p>
      </div>
      <p>a little subtitle to give context</p>
    </Link>
  </li>
);
