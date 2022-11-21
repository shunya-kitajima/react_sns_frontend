import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'

export const ApiContext = createContext()

const ApiContextProvider: React.FC = (props: any) => {
  const [profile, setProfile] = useState([])
  const [profiles, setProfiles] = useState([])
  const [editedProfile, setEditedProfile] = useState({ id: '', nickName: '' })
  const [askList, setAskList] = useState([])
  const [askListFull, setAskListFull] = useState([])
  const [inbox, setInbox] = useState([])
  const [cover, setCover] = useState([])
  const token = props.cookies.get('current-token') as string

  useEffect(() => {
    const getMyProfile = async (): Promise<void> => {
      try {
        const resMyProfile = await axios.get(
          'http://127.0.0.1:8000/api/user/myprofile/',
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        )
        const resApproval = await axios.get(
          'http://127.0.0.1:8000/api/user/approval/',
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        )
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (resMyProfile.data[0]) {
          setProfile(resMyProfile.data[0])
          setEditedProfile({
            id: resMyProfile.data[0].id,
            nickName: resMyProfile.data[0].nickName,
          })
          setAskList(
            resMyProfile.data.filter((ask: any) => {
              return resMyProfile.data[0].userPro === ask.askTo
            })
          )
          setAskListFull(resApproval.data)
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }

    const getProfiles = async (): Promise<void> => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        setProfiles(res.data)
      } catch (err: any) {
        console.log(err.message)
      }
    }

    const getInbox = async (): Promise<void> => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/dm/inbox/', {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        setInbox(res.data)
      } catch (err: any) {
        console.log(err.message)
      }
    }
    void getMyProfile()
    void getProfiles()
    void getInbox()
  }, [token, profile.id])

  return <div></div>
}

export default withCookies(ApiContextProvider)
