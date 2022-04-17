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
import { useStorage } from '../contexts/Storage'
import useChanges from '../hooks/useChanges'
import { timetable_example } from '../timetable_sample'

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
  console.log(changes)
  return (
    <Layout
      title="Home | Next.js + TypeScript Example"
      className="flex justify-center w-full items-center"
    ></Layout>
  )
}

export default IndexPage
