import React from 'react'
import { RiUserReceivedLine } from 'react-icons/ri'
import { Profile, DM } from '../types'

export interface Props {
  profileDataArr: Profile[]
  dmData: DM
}
const InboxDM: React.FC<Props> = ({ profileDataArr, dmData }) => {
  return (
    <li className="list-item">
      {profileDataArr.length !== 0 && <h4>{dmData.message}</h4>}
      {profileDataArr.length !== 0 && (
        <h4>
          <RiUserReceivedLine className="badge" />
          {profileDataArr[0].nickName}
        </h4>
      )}
    </li>
  )
}

export default InboxDM
