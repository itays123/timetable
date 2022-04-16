import Button from '../components/forms/Button'
import DropdownPick from '../components/forms/DropdownPick'
import Layout from '../components/Layout'
import LessonsOfDay from '../components/timetable/LessonsOfDay'
import Lesson from '../components/timetable/Lesson'
import LessonOption from '../components/timetable/LessonPick/LessonOption'
import LoadingScreen from '../components/ui/LoadingScreens'
import { useTimetable } from '../contexts/Timetable'
import { ILesson, LessonModification } from '../interfaces'
import AppLoadingScreen from '../components/ui/LoadingScreens/AppLoadingScreen'

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
  return (
    <Layout
      title="Home | Next.js + TypeScript Example"
      className="flex justify-center w-full items-center"
    >
      <AppLoadingScreen></AppLoadingScreen>
    </Layout>
  )
}

export default IndexPage
