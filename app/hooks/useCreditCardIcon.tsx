import React, { useMemo, ReactNode } from 'react'
import { SvgProps } from 'react-native-svg'
import VisaIcon from 'assets/svg/visa.svg'
import MastercardIcon from 'assets/svg/mastercard.svg'
import ApplePayIcon from 'assets/svg/apple-pay.svg'
import { PaymentBrand } from 'store/payments/types'

const useCreditCardIcon = (props?: SvgProps) =>
  useMemo(
    (): { [x: string]: ReactNode } => ({
      [PaymentBrand.visa]: <VisaIcon {...props} />,
      [PaymentBrand.mastercard]: <MastercardIcon {...props} />,
      [PaymentBrand.applePay]: <ApplePayIcon {...props} />,
      default: null,
    }),
    [props],
  )

export default useCreditCardIcon
