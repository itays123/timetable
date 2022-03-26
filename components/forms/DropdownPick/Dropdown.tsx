type Variant = 'default' | 'lesson'

export interface DropdownProps<T> {
  options: T[]
  defaultIndex?: number
  onChange?(number): unknown
  onClick?(number): unknown
  selectedIndex: number
  changeSelectedIndex?(number): unknown
  setOpen?(boolean): unknown
  getOption?: (value: T) => string
}

export default function Dropdown<T>({
  options,
  onChange = () => {},
  onClick = () => {},
  selectedIndex,
  changeSelectedIndex = () => {},
  setOpen = () => {},
  getOption = (value) => value.toString(),
}: DropdownProps<T>) {
  return (
    <div
      className={`overflow-hidden flex flex-col absolute w-full top-[3rem] bg-uiPrimary-200 text-uiPrimary-400 rounded-b-[5px] z-10`}
    >
      {options.map(
        (option, index) =>
          index !== selectedIndex && (
            <div
              key={index}
              onClick={() => {
                changeSelectedIndex(index)
                onClick(index)
                setOpen(false)
              }}
              className="h-8 flex items-center hover:bg-uiPrimary-300 justify-start w-full cursor-pointer pr-[1rem] pl-[1rem]"
            >
              <p className="w-full">{getOption(option)}</p>
            </div>
          )
      )}
    </div>
  )
}
