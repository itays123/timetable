import Button from '../components/forms/Button'
import DropdownPick from '../components/forms/DropdownPick'
import Layout from '../components/Layout'
import LessonsOfDay from '../components/timetable/LessonsOfDay'
import Lesson from '../components/timetable/Lesson'
import LessonOption from '../components/timetable/LessonPick/LessonOption'
import LoadingScreen from '../components/ui/LoadingScreens'
import { useUpdates } from '../contexts/Updates'
import { ILesson, LessonModification } from '../interfaces'
import AppLoadingScreen from '../components/ui/LoadingScreens/AppLoadingScreen'
import { useStorage } from '../contexts/Storage'
import useChanges from '../hooks/useChanges'
import { timetable_example } from '../timetable_sample'
import Change from '../components/changes/GroupOfChanges'
import SingleChange from '../components/changes/GroupOfChanges'
import { HEBREW_DAYS } from '../hooks/useHebrewDate'

const defaultLesson: ILesson = {
  class: 'מחשבים יב',
  subject: 'פרטני צמצום פערים ח תלמידים בחלון',
  teacher: 'מלך העולם קונסטנטין זבלינסקי',
  changes: [
    {
      modification: LessonModification.NewHour,
      modData: 'הנדסת תוכנה אפליקציות',
    },
  ],
}

const IndexPage = () => {
  const lessons = timetable_example as ILesson[][]
  const changes = useChanges(lessons)
  return (
    <Layout
      title="Home | Next.js + TypeScript Example"
      className="flex justify-center w-full items-center"
    >
      <div className="flex flex-col"></div>
    </Layout>
  )
}

export default IndexPage
