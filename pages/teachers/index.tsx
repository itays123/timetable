import { GetStaticProps } from 'next'
import { useMemo, useState } from 'react'
import { buildTitleGetStaticProps } from '../../components/DocumentHead'
import Input from '../../components/forms/Input'
import List from '../../components/forms/List'
import Layout from '../../components/Layout'
import Navbar from '../../components/ui/Navbar'
import PageTitle from '../../components/ui/PageTitle'
import { useStorage } from '../../contexts/Storage'
import { TeacherList } from '../../utils/teacherList/TeacherList'

const TEACHER_SEARCH = 'חיפוש מורה'

const TeacherLookup = () => {
  const { lessons } = useStorage()
  const [searchQuery, setSearchQuery] = useState('')

  const teachers = useMemo(() => TeacherList.fromSchedule(lessons), [lessons])

  const showHistory = useMemo(() => searchQuery === '', [searchQuery])

  return (
    <Layout className="flex flex-col px-4">
      <PageTitle title={TEACHER_SEARCH} />
      <div className="flex flex-col overflow-hidden h-full gap-4 mb-14">
        <Input
          value=""
          hint={TEACHER_SEARCH}
          onChange={(query) => setSearchQuery(query)}
        />
        <List
          list={teachers}
          showHistory={showHistory}
          query={searchQuery}
          PATH={'/teachers'}
        />
      </div>
      <Navbar />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps =
  buildTitleGetStaticProps(TEACHER_SEARCH)

export default TeacherLookup
