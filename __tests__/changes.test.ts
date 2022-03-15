// Test the behavior of multiple changes and changes without study groups

import { Timetable } from '../utils/timetable/TimetableClass'
import { ILesson } from '../interfaces'

const timetable_example: (ILesson | {})[][] = [
  [
    {},
    {
      subject: 'כימיה',
      teacher: 'זרסקי יפעת',
      class: 'כימיה מעבדה 2',
      modification: 1,
      modData: 'קוסטיה',
    },
    {
      subject: 'כימיה',
      teacher: 'זרסקי יפעת',
      class: 'כימיה מעבדה 2',
      modification: 5,
      modData: 'חח כימיה זה מקצוע הומני חח',
    },
    {
      subject: 'היסטוריה',
      teacher: 'אשכנזי חיים',
      class: 'חדר י 7',
    },
    {
      subject: 'הבעה ולשון',
      teacher: 'אהרון שוחט גלית',
      class: 'חדר י 7',
      modification: 3,
      modData: 'שכנר איתי',
    },
    {
      subject: 'מתמטיקה 5',
      teacher: 'טיראן חוה',
      class: 'חדר י 6',
      modification: 2,
      modData: 'מבחן? אה שכחתי אתה לא לומד מתמטיקה',
    },
    {
      subject: 'מתמטיקה 5',
      teacher: 'טיראן חוה',
      class: 'חדר י 6',
    },
    {
      subject: 'חנג בנים',
      teacher: 'פריזה אמיר',
      class: '',
    },
    {},
    {},
    {},
    {},
    {},
  ],
  [
    {},
    {
      subject: 'היסטוריה',
      teacher: 'אשכנזי חיים',
      class: 'חדר י 7',
    },
    {
      subject: 'היסטוריה',
      teacher: 'אשכנזי חיים',
      class: 'חדר י 7',
    },
    {
      subject: 'השכלה כללית א',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 7',
    },
    {
      subject: 'אנגלית 5',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 3',
    },
    {
      subject: 'אנגלית 5',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 3',
    },
    {
      subject: 'כימיה',
      teacher: 'זרסקי יפעת',
      class: 'כימיה מעבדה 2',
    },
    {},
    {},
    {},
    {},
    {},
    {},
  ],
  [
    {},
    {
      subject: 'מתמטיקה 5',
      teacher: 'טיראן חוה',
      class: 'חדר י 6',
    },
    {
      subject: 'מתמטיקה 5',
      teacher: 'טיראן חוה',
      class: 'חדר י 6',
    },
    {
      subject: 'תנ"ך',
      teacher: 'ארבל אסף',
      class: 'חדר י 7',
    },
    {
      subject: 'חינוך',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 7',
    },
    {
      subject: 'מדעי המחשב יחל 1',
      teacher: 'זבלינסקי קונסטנטין',
      class: 'חדר מחשב שכבה  ז',
    },
    {
      subject: 'מדעי המחשב יחל 1',
      teacher: 'זבלינסקי קונסטנטין',
      class: 'חדר מחשב שכבה  ז',
    },
    {
      subject: 'הבעה ולשון',
      teacher: 'אהרון שוחט גלית',
      class: 'חדר י 7',
    },
    {},
    {},
    {},
    {},
    {},
  ],
  [
    {},
    {
      subject: 'מתמטיקה 5',
      teacher: 'וינשטוק ענת',
      class: 'מקוון סינכרוני',
    },
    {
      subject: 'השכלה כללית',
      teacher: 'בן אליעזר אודי',
      class: 'מקוון סינכרוני',
    },
    {},
    {
      subject: 'מדעי המחשב יחל 1',
      teacher: 'זבלינסקי קונסטנטין',
      class: 'חדר מחשב שכבה  ז',
    },
    {
      subject: 'השכלה כללית',
      teacher: 'בן אליעזר אודי',
      class: 'חדר י 7',
    },
    {
      subject: 'אנגלית 5',
      teacher: 'ורגוליס ארתור',
      class: 'מקוון אסינכרוני',
    },
    {},
    {
      subject: 'כימיה',
      teacher: 'זרסקי יפעת',
      class: 'מקוון סינכרוני',
    },
    {},
    {},
    {},
    {},
  ],
  [
    {},
    {
      subject: 'תנ"ך',
      teacher: 'ארבל אסף',
      class: 'חדר י 7',
    },
    {
      subject: 'תנ"ך',
      teacher: 'ארבל אסף',
      class: 'חדר י 7',
    },
    {
      subject: 'אנגלית 5',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 3',
    },
    {
      subject: 'אנגלית 5',
      teacher: 'ורגוליס ארתור',
      class: 'חדר י 3',
    },
    {
      subject: 'הבעה ולשון',
      teacher: 'אהרון שוחט גלית',
      class: 'חדר י 7',
    },
    {
      subject: 'חנג בנים',
      teacher: 'פריזה אמיר',
      class: '',
    },
    {},
    {},
    {},
    {},
    {},
    {},
  ],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
]
const timetable = new Timetable(timetable_example as ILesson[][], true)

describe('Tests the behavior of unconventional changes', () => {
  it('Tests multiple changes', () => {
    const changes = []
    timetable.applyChanges(changes)
  })
  it('Tests study group-less changes', () => {
    const changes = []
    timetable.applyChanges(changes)
  })
})
