import { useMemo, useState } from 'react'
import ChangesOfHour from '../components/changes'
import ChangesOfDay from '../components/changes/ChnagesOfDay'
import RadioButton from '../components/forms/RadioButton'
import Layout from '../components/Layout'
import Navbar from '../components/ui/Navbar'
import PageTitle from '../components/ui/PageTitle'
import { useStorage } from '../contexts/Storage'
import useChanges from '../hooks/useChanges'
import useCurrentDay from '../hooks/useCurrentDay'
import useDate, { dateOfDay } from '../hooks/useDate'
import { useDayFilterer } from '../hooks/useDayFilterer'
import useHebrewDate, {
  HEBREW_DAYS,
  daylessHebrewDate,
} from '../hooks/useHebrewDate'
import { DayOfWeek, ILesson } from '../interfaces'
import { timetable_example } from '../timetable_sample'

const NO_CHANGES = 'אין שינויים להצגה'

const ChangesPage = () => {
  const { lessons } = useStorage()
  const { changes, numOfChanges } = useChanges(lessons)

  const dayFilterer = useDayFilterer(lessons)
  const { currentDay, date } = useCurrentDay(dayFilterer)

  const [showAllChanges, setshowAllChanges] = useState(true)

  //TODO: Make filter work
  return (
    <Layout className="overflow-hidden flex flex-col text-center">
      <PageTitle title="שינויים" />
      <div className="flex flex-col gap-4 px-5 mb-14 overflow-hidden pt-1">
        <div className="flex justify-evenly gap-4 overflow-visible">
          <RadioButton
            selected={showAllChanges}
            label="כל השינויים"
            orientation="vertical"
            onClick={() => setshowAllChanges(true)}
          ></RadioButton>
          <RadioButton
            selected={!showAllChanges}
            label="שינויים של היום"
            orientation="vertical"
            onClick={() => setshowAllChanges(false)}
          ></RadioButton>
        </div>
        <div className="flex flex-col gap-2 overflow-y-scroll">
          {changes.map(
            (changesOfDay, dayIndex) =>
              changesOfDay.length > 0 &&
              (dayIndex === currentDay || showAllChanges) && (
                <ChangesOfDay
                  dayOfWeek={dayIndex as DayOfWeek}
                  currentDay={currentDay}
                  changesOfDay={changesOfDay}
                  date={date.current}
                />
              )
          )}
        </div>
      </div>
      {numOfChanges == 0 && (
        <p className="font-semibold dark:text-white">{NO_CHANGES}</p>
      )}

      <Navbar />
    </Layout>
  )
}

export default ChangesPage
