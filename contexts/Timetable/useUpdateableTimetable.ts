import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useValueChangeCallback from '../../hooks/useValueChangeCallback'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { Timetable } from '../../utils'
import { useStorage } from '../Storage'
import { useLessonMatrixState } from './localStorageState'
import useUpdates from './useUpdates'

export interface IUpdateableTimetable {
  lessons: ILesson[][]
  applyUpdates(): unknown
  errorInFetch: boolean
  loadingUpdates: boolean
  changesPending: boolean
  problems: [DayOfWeek, HourOfDay][]
  setProblems: Dispatch<SetStateAction<[DayOfWeek, HourOfDay][]>>
  refetchUpdates(): unknown
  applyLesson(day: DayOfWeek, hour: HourOfDay[], lesson: ILesson): unknown
}

/**
 * Warning: DO NOT use this in components.
 * This hook is responsible for managing the state of the TimetableContextProvider
 */
export function useUpdateableTimetable(): IUpdateableTimetable {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])
  const needsRefreshRef = useRef(false)
  const { studyGroups, studyGroupMap, showOthersChanges, classId, school } =
    useStorage()
  const updates = useUpdates()

  // update timetable immedietly if overriden by server
  useEffect(() => {
    const { overrideTimetable, problems } = updates.data
    if (overrideTimetable) setLessonMatrix(overrideTimetable)
    setProblems(problems)
    if (problems && problems.length > 0) needsRefreshRef.current = true
  }, [setLessonMatrix, updates.data])

  // mark needs refresh when school and classId values change
  const markNeedsRefresh = useCallback(() => {
    needsRefreshRef.current = true
    setLessonMatrix([])
  }, [setLessonMatrix])
  useValueChangeCallback(school, markNeedsRefresh)
  useValueChangeCallback(classId, markNeedsRefresh)

  // refetch timetable once problems are eliminated
  useEffect(() => {
    if (needsRefreshRef.current && problems && !problems.length) {
      needsRefreshRef.current = false
      updates.fetchUpdates()
    }
  }, [problems, updates, updates.fetchUpdates])

  // use in toast
  const applyUpdates = useCallback(() => {
    const { newChanges } = updates.data
    if (lessonMatrix.length && !updates.isLoading) {
      setLessonMatrix((prev) => {
        const timetable = new Timetable(prev, {
          studyGroups: studyGroups,
          studyGroupMap: studyGroupMap,
          showOthersChanges: showOthersChanges,
        })
        if (newChanges) timetable.applyExistingChanges([...newChanges])
        return timetable.lessons
      })
    }
  }, [
    updates.data,
    updates.isLoading,
    lessonMatrix,
    studyGroups,
    studyGroupMap,
    showOthersChanges,
    setLessonMatrix,
  ])

  const refetchUpdates = useCallback(() => {
    setProblems([])
    updates.fetchUpdates()
  }, [updates])

  // determine if toast needs to be shown
  const changesPending = useMemo(
    () =>
      updates.data.newChanges &&
      updates.data.newChanges.length &&
      !updates.isLoading,
    [updates]
  )

  const applyLesson = useCallback(
    (day: DayOfWeek, hour: HourOfDay[], lesson: ILesson) => {
      setLessonMatrix((prev) => {
        let lessons = [...prev]
        for (let h of hour) lessons[day][h] = lesson
        return lessons
      })
    },
    [setLessonMatrix]
  )

  return {
    changesPending,
    applyUpdates,
    problems,
    setProblems,
    refetchUpdates,
    applyLesson,
    lessons: lessonMatrix,
    errorInFetch: updates.error,
    loadingUpdates: updates.isLoading,
  }
}
