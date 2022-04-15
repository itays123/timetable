import { Dispatch, SetStateAction, useCallback } from 'react'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { IUpdateableTimetable } from './useUpdateableTimetable'

export function useRemoveProblems(updateableTimetable: IUpdateableTimetable) {
  return useCallback(
    (day: DayOfWeek, hours: HourOfDay[]) => {
      updateableTimetable.setProblems((prev) =>
        prev.filter(([d, h]) => d != day || hours.every((hour) => hour != h))
      )
    },
    [updateableTimetable.setProblems]
  )
}

export function useApplyLessons(
  removeProblems: (day: DayOfWeek, hours: HourOfDay[]) => unknown,
  updateableTimetable: IUpdateableTimetable,
  setStudyGroupMap: Dispatch<SetStateAction<Map<string, number>>>,
  setLastUpdateTime: Dispatch<SetStateAction<Date>>
) {
  return useCallback(
    (
      day: DayOfWeek,
      hour: HourOfDay[],
      lesson: ILesson,
      isEditing: boolean,
      indexOfSg: number
    ) => {
      setStudyGroupMap((prev) => {
        for (let h of hour) prev.set(`${day},${h}`, indexOfSg)
        return prev
      })
      if (!isEditing) removeProblems(day, hour)
      updateableTimetable.applyLesson(day, hour, lesson)
      setLastUpdateTime(undefined)
    },
    [
      setStudyGroupMap,
      removeProblems,
      updateableTimetable.applyLesson,
      setLastUpdateTime,
    ]
  )
}