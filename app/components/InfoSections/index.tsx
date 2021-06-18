import React, { FC, Fragment, memo } from 'react'
import Typography, { TypographyVariants } from 'components/Typography'
import InfoItem, { IProps as InfoItemProp } from 'components/InfoItem'
import map from 'lodash.map'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

interface IProps {
  info: Array<{ title: string; items: Array<InfoItemProp> }>
  titleStyle: StyleProp<TextStyle>
  infoItemStyle: StyleProp<ViewStyle>
}
const InfoSections: FC<IProps> = ({ info, titleStyle, infoItemStyle }) => {
  return (
    <>
      {map(info, ({ title, items }, index) => (
        <Fragment key={index}>
          <Typography variant={TypographyVariants.subhead} style={titleStyle}>
            {title}
          </Typography>
          {map(items, (item, idx) => (
            <InfoItem key={idx} style={infoItemStyle} {...item} />
          ))}
        </Fragment>
      ))}
    </>
  )
}

export default memo(InfoSections)
