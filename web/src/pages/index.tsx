interface HomeProps {
  count: number;
}
import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import avatarImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('');

  console.log(poolTitle);

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try{
      const response = await api.post('/pools', {
        title: poolTitle,
      })
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert('Bolão criado com sucesso! Código copiado para a área de transferência.');

      setPoolTitle('');
    } 
    catch (error) {
      alert('Erro ao criar o Bolão!');
    }
  }

  fetch('http://localhost:3333/pools/count').then(response => response.json()).then(data => {
    console.log(data)})

  return (
    <div className = "max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>

        <Image src={logoImg} alt="Logo" />

        <h1 className='mt-14 text-5xl text-white-900 font-bold leading-tight'>
          Crie seu Bolão e compartilhe com os amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatarImg} alt="Avatars" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input 
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text" 
            required placeholder="Qual o nome do seu bolão?" 
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button 
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type="submit">
              Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-gray-300 text-sm leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 grid grid-cols-2 text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões Criados</span>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites Enviados</span>
            </div>
          </div>
        </div>

        <div className='mt-16'></div>

      </main>

      <Image src={appPreviewImg} alt="Celulares" />

    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCounteResponse, guessCounteResponse, userCounteResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCounteResponse.data.count,
      guessCount: guessCounteResponse.data.count,
      userCount: userCounteResponse.data.count
    }
  }
}
