import React, { useMemo } from 'react'
import { SvgProps } from 'react-native-svg'
import VisaIcon from 'assets/svg/visa.svg'
import MastercardIcon from 'assets/svg/mastercard.svg'

const useCreditCardIcon = (props?: SvgProps) =>
  useMemo(
    () => ({
      visa: <VisaIcon {...props} />,
      mastercard: <MastercardIcon {...props} />,
    }),
    [props],
  )

export default useCreditCardIcon
