import { NextRouter, useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useStorage } from '../../../contexts/Storage'
import { IStorageContext } from '../../../contexts/Storage/types'
import { ISettingsComponentProps, SettingsComponent } from '../types'
import SettingsPageLayout, {
  ISettingsPageLayoutProps,
} from './SettingsPageLayout'

export type PropProvider<T, A extends {} = {}> = (
  ctx: IStorageContext,
  router: NextRouter
) => A & Partial<ISettingsComponentProps<T>>

function asPage<T, AdditionalProps>(
  Component: SettingsComponent<T, AdditionalProps>,
  layoutProps: Omit<ISettingsPageLayoutProps, 'onBackPress'>,
  propProvider: PropProvider<T, AdditionalProps>
) {
  return function Page() {
    const storage = useStorage()
    const router = useRouter()
    const {
      value: initialValue,
      save,
      navigateBack = save,
      ...additionalProps
    } = useMemo(() => propProvider(storage, router), [storage, router])
    const [selectedValue, setSelectedValue] = useState(initialValue)
    const saveCallback = useCallback(
      (ob?: T) => {
        if (ob) save(ob)
        else save(selectedValue)
        navigateBack()
      },
      [save, selectedValue, navigateBack]
    )
    return (
      <SettingsPageLayout
        {...layoutProps}
        onBackPress={() => {
          navigateBack(selectedValue)
        }}
      >
        <Component
          {...(additionalProps as unknown as AdditionalProps)}
          value={selectedValue}
          onChange={setSelectedValue}
          save={saveCallback}
          navigateBack={navigateBack}
        />
      </SettingsPageLayout>
    )
  }
}

export default asPage