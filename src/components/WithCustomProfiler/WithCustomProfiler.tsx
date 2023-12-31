import { NotificationContext } from 'contexts/notificactions/Provider'
import { NotificationContextType } from 'contexts/notificactions/types'
import { FC, Profiler, PropsWithChildren, useContext } from 'react'

type Props = {
  id: string 
}

export const WithCustomProfiler: FC<PropsWithChildren<Props>> = ({ id, children }) => {

  const [_, setNotification] = useContext<NotificationContextType>(NotificationContext)

    const onRender: React.ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      if(actualDuration <= 2 || baseDuration <= 2) return;
      if(phase === 'mount') return;
      
      return setNotification({
        name: id,
        ms: actualDuration
      })
    }

    return (
      <Profiler id={id} onRender={onRender}> 
        {children}
      </Profiler>
    )
}