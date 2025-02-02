import { ActivityActions } from '../reducers/activityReducer'
import { categories } from '../data/categories'
import { useMemo, Dispatch } from 'react'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { Activity } from '../types/types'

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
    [activities]
  )

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center'>
        Comida y Actividades
      </h2>

      {
        isEmptyActivities ? <p className='text-center mt-3'>No hay actividades</p> :
          activities.map(act => (
            <div key={act.id} className='px-5 py-10 mt-5 bg-white flex justify-between'>
              <div className='space-y-2 relative'>
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${act.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                  {categoryName(+act.category)}
                </p>
                <p className='text-2xl font-bold pt-5'>{act.name}</p>
                <p className='font-black text-4xl text-lime-500'>{act.calories}{' '}<span>Calorias</span></p>
              </div>
              <div className='felx gap-5 items-center'>
                <button onClick={() => dispatch({ type: 'set-activeID', payload: { id: act.id } })}>
                  <PencilSquareIcon className='h-8 w-8 text-gray-800 mr-3' />
                </button>

                <button onClick={() => dispatch({ type: 'delete-activity', payload: { id: act.id } })}>
                  <XCircleIcon className='h-8 w-8 text-red-500' />
                </button>
              </div>
            </div>
          ))
      }
    </>
  )
}
