import { useMemo } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'
import LoadingScreen from '../ui/LoadingScreens'
import { SettingsComponent } from './types'

export interface IClassSetting {
  classId: string
  grade: number
  classNum: number
}

export interface IClassSettingProps {
  onSchoolEditClick(): unknown
}

const ClassSetting: SettingsComponent<IClassSetting, IClassSettingProps> = ({
  value: { grade, classNum },
  onChange,
  save,
  onSchoolEditClick,
}) => {
  const { school, schoolName } = useStorage()
  const { classes, grades } = useClasses(school)
  const gradeOptions = useMemo(
    () => grades.map((grade) => ClassLookup.getFormattedGradeName(grade)),
    [grades]
  )
  const gradeIndex = useMemo(
    () => (grades[0] && grade ? grade - grades[0] : 0),
    [grade, grades]
  )
  const classNumOptions = useMemo(
    () =>
      classes && classes[gradeIndex]
        ? classes[gradeIndex]
            .filter((grade) => grade != -1)
            .map((classId, index) => (index + 1).toString())
        : [],
    [classes, gradeIndex]
  )

  if (!classes[0]) return <LoadingScreen label="כיתות" />

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex justify-center items-center gap-1">
          <p className="font-bold text-4xl">{schoolName}</p>
          <button onClick={onSchoolEditClick}>
            <Edit width={24} height={24}></Edit>
          </button>
        </div>
        <p className="font-bold text-2xl">באיזו כיתה אתם לומדים?</p>
      </div>
      <div className="flex gap-4 justify-center">
        <DropdownPick
          options={gradeOptions}
          onIndexChange={(idx) =>
            onChange((prev) => ({ ...prev, grade: idx + grades[0] }))
          }
          indexOfValue={gradeIndex}
        />
        <DropdownPick
          options={classNumOptions}
          onIndexChange={(selectedIndex) =>
            onChange((prev) => ({
              ...prev,
              classNum: selectedIndex + 1,
              classId: classes[gradeIndex][selectedIndex].toString(),
            }))
          }
          indexOfValue={classNum ? classNum - 1 : 0}
        />
        <Button className="w-20 my-0 mx-0" onClick={save}>
          הבא
        </Button>
      </div>
    </div>
  )
}

export default ClassSetting
