import { NextApiRequest, NextApiResponse } from 'next'
import { IChangesResponse } from '../../../interfaces'
import { fetchDataSource, Timetable } from '../../../utils'
import { QueryParamsSettings } from '../../../utils'
import { InputError } from '../../../interfaces/errors'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const settings = new QueryParamsSettings(query)
    const schoolSymbol = query.school.toString()
    const classId = query.classId.toString()

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    )

    const date = new Date()
    const lastUserUpdate = date //TODO: get the date from query

    res.status(200).json(Timetable.updateableTimetable(lastUserUpdate, Changes))
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
