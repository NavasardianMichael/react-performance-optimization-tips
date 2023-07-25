import { Box, Skeleton, Typography } from "@mui/material";
import { WithCodeHinter } from "components/WithCodeHinter/Main";
import { WithCustomProfiler } from "components/WithCustomProfiler/WithCustomProfiler";

export default function Profiler() {
  return (
    <Box>
        <WithCustomProfiler id='react-profiler'>
            <Typography sx={{mb: 3}} variant="h4" component="h4">React Profiler</Typography>
            <WithCodeHinter code={code}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                </Box>
            </WithCodeHinter>
        </WithCustomProfiler>
    </Box>
  )
}

const code = `
function Profiler() {
  return (
    <Box>
        <WithCustomProfiler id='react-profiler'>
            <Typography sx={{mb: 3}} variant="h4" component="h4">React Profiler</Typography>
            <WithCodeHinter code={code}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </WithCodeHinter>
        </WithCustomProfiler>
    </Box>
  )
}


// Custom profiler
type Props = {
  id: string 
}

export const WithCustomProfiler: FC<PropsWithChildren<Props>> = ({ id, children }) => {

  const [_, setNotification] = useContext<NotificationContextType>(NotificationContext)

    const onRender: React.ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
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
`