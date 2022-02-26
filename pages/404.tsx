import Link from 'next/link'
import Button from '../components/forms/Button'
import { Shahaf } from '../components/icons'
import Layout from '../components/Layout'

const _404Page = () => {
  return (
    <Layout
      title="העמוד לא נמצא"
      className="bg-gray-900 h-screen flex items-center justify-center flex-col gap-3"
    >
      <div className="flex text-[90px] font-_404 font-black text-white gap-1 my-[-32px]">
        <a>4</a>
        <Shahaf className="w-[140px] ml-[-22px] z-10"></Shahaf>
        <a>4</a>
      </div>
      <p className="text-white font-extrabold text-2xl">העמוד לא נמצא</p>
      <div>
        <Button>
          <Link href={'/'}> לדף הבית</Link>
        </Button>
        <Button variant="secondary">
          <Link href={'/'}>למערכת שחף</Link>
        </Button>
      </div>
    </Layout>
  )
}

export default _404Page
