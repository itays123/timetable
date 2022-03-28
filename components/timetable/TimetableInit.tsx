import { useCallback, useMemo, useState } from 'react'
import { useFullTimetable } from '../../contexts/FullTimetable'
import { useStorage } from '../../contexts/Storage'
import useHebrewDate, { HEBREW_DAYS } from '../../hooks/useHebrewDate'
import { useIteration } from '../../hooks/useIteration'
import { useEditableDays } from '../../hooks/useEditableDays'
import { DayOfWeek, HourOfDay, isAnyLessonObj } from '../../interfaces'
import Button from '../forms/Button'
import TimetableSkeleton from './TimetableSkeleton'
import Timetable, { SupportedLesson } from './Timetable'
import { useTimetable } from '../../contexts/Timetable'

export default function TimetableInit() {
  const { timetable } = useFullTimetable()
  const days = useEditableDays(timetable)
  const { currentItem: currentDay, ...gestures } = useIteration(days)
  const { appendScheduleSetting } = useTimetable()

  return (
    <div className="p-[18px] h-screen flex flex-col justify-between items-center gap-2 ">
      <p className="font-bold text-2xl">הוסיפו שיעורים במקומות הריקים</p>
      <p className="font-semibold text-xl">{HEBREW_DAYS[currentDay]}</p>
      <div
        className={`bg-stone-200 p-[18px] rounded-[30px] w-full h-full ${
          timetable.length ? 'overflow-scroll' : 'overflow-hidden'
        }`}
      >
        {timetable.length ? (
          <Timetable
            day={currentDay}
            timetable={timetable}
            allEditable
          ></Timetable>
        ) : (
          <TimetableSkeleton></TimetableSkeleton>
        )}
      </div>
      <div className="flex justify-between w-full p-0">
        <Button
          disabled={gestures.prevDisabled}
          onClick={gestures.prev}
          className="mx-0 w-24"
          variant="secondary"
        >
          הקודם
        </Button>
        <Button
          disabled={gestures.nextDisabled}
          onClick={gestures.next}
          className="mx-0 w-24"
        >
          הבא
        </Button>
      </div>
    </div>
  )
}
