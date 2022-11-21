import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Profile, EditedProfile, Cover, FriendRequest, DM } from '../types'

export const ApiContext = createContext()

const ApiContextProvider: React.FC = (props: any) => {
  const [profile, setProfile] = useState<Profile>({
    id: '',
    nickName: '',
    userPro: '',
    created_at: '',
    img: '',
  })
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    id: '',
    nickName: '',
  })
  const [askList, setAskList] = useState<FriendRequest[]>([])
  const [askListFull, setAskListFull] = useState<FriendRequest[]>([])
  const [inbox, setInbox] = useState([])
  const [cover, setCover] = useState<Cover>({ name: '' })
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

  const createProfile = async (): Promise<void> => {
    const createData = new FormData()
    createData.append('nickName', editedProfile.nickName)
    cover.name && createData.append('img', cover, cover.name)
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/user/profile/',
        createData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setProfile(res.data)
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName })
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const deleteProfile = async (): Promise<void> => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/user/profile/${profile.id}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setProfiles(
        profiles.filter((prof) => {
          return profile.id !== prof.id
        })
      )
      setProfile({
        id: '',
        nickName: '',
        userPro: '',
        created_at: '',
        img: '',
      })
      setEditedProfile({
        id: '',
        nickName: '',
      })
      setCover([])
      setAskList([])
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const updateProfile = async (): Promise<void> => {
    const editData = new FormData()
    editData.append('nickName', editedProfile.nickName)
    cover.name && editData.append('img', cover, cover.name)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/user/profile/${profile.id}/`,
        editData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setProfile(res.data)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const createFriendRequest = async (
    requestData: FriendRequest
  ): Promise<void> => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/user/approval/',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setAskListFull([...askListFull, res.data])
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const approvedFriendRequest = () => {}

  const sendDM = async (DM: DM): Promise<void> => {
    try {
      await axios.post('http://127.0.0.1:8000/api/dm/message/', DM, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      })
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return <div></div>
}

export default withCookies(ApiContextProvider)
