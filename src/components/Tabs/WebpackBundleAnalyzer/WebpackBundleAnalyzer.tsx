import { Typography } from '@mui/material'
import WebpackBundleAnalyzerResultScreenShot from 'assets/images/webpackBundleAnalyzer.PNG'

export default function WebpackBundleAnalyzer() {
  return (
    <>
        <Typography variant="h4" component="h4">
            WebpackBundleAnalyzer
        </Typography>
        <img style={{ width: '90%', maxWidth: '1000px' }} src={WebpackBundleAnalyzerResultScreenShot} />
    </>
  )
}
