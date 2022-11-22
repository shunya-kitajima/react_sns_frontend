import React, { createContext, useState, useEffect } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { Profile, EditedProfile, Cover, FriendRequest, DM } from '../types'

export const ApiContext = createContext(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as {
    profile: Profile
    profiles: Profile[]
    editedProfile: EditedProfile
    setEditedProfile: React.Dispatch<React.SetStateAction<EditedProfile>>
    friendRequestList: FriendRequest[]
    allFriendRequestList: FriendRequest[]
    inbox: DM[]
    cover: Cover
    setCover: React.Dispatch<React.SetStateAction<Cover>>
    createProfile: () => Promise<void>
    updateProfile: () => Promise<void>
    deleteProfile: () => Promise<void>
    createFriendRequest: (
      request: Omit<FriendRequest, 'id' | 'approved'>
    ) => Promise<void>
    approveFriendRequest: (
      request: FriendRequest,
      approvedRequest: FriendRequest
    ) => Promise<void>
    sendDM: (DM: DM) => Promise<void>
  }
)

const ApiContextProvider: React.FC = (props: any) => {
  const [profile, setProfile] = useState<Profile>({
    id: null,
    nickName: '',
    userPro: null,
    created_at: '',
    img: '',
  })
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [editedProfile, setEditedProfile] = useState<EditedProfile>({
    id: null,
    nickName: '',
  })
  const [friendRequestList, setFriendRequestList] = useState<FriendRequest[]>(
    []
  )
  const [allFriendRequestList, setAllFriendRequestList] = useState<
    FriendRequest[]
  >([])
  const [inbox, setInbox] = useState<DM[]>([])
  const [cover, setCover] = useState<Cover>({
    imgFile: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
  })
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
          setFriendRequestList(
            resApproval.data.filter((request: any) => {
              return resMyProfile.data[0].userPro === request.askTo
            })
          )
          setAllFriendRequestList(resApproval.data)
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
    cover.imgFile.name !== '' &&
      createData.append('img', cover.imgFile, cover.imgFile.name)
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
    if (profile.id === null) throw new Error('profile data error')
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
        id: null,
        nickName: '',
        userPro: null,
        created_at: '',
        img: '',
      })
      setEditedProfile({
        id: null,
        nickName: '',
      })
      setCover({
        imgFile: new File(['dummy'], 'dummy.txt', { type: 'text/plain' }),
      })
      setFriendRequestList([])
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const updateProfile = async (): Promise<void> => {
    const editData = new FormData()
    editData.append('nickName', editedProfile.nickName)
    cover.imgFile.name !== '' &&
      editData.append('img', cover.imgFile, cover.imgFile.name)
    if (profile.id === null) throw new Error('profile data error')
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
    request: Omit<FriendRequest, 'id' | 'approved'>
  ): Promise<void> => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/user/approval/',
        request,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setAllFriendRequestList([...allFriendRequestList, res.data])
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const approveFriendRequest = async (
    request: FriendRequest,
    approvedRequest: FriendRequest
  ): Promise<void> => {
    if (request.id === null) throw new Error('profile data error')
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/user/approval/${request.id}/`,
        approvedRequest,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
          },
        }
      )
      setFriendRequestList(
        friendRequestList.map((ask) => (ask.id === request.id ? res.data : ask))
      )

      const prevRequests = allFriendRequestList.filter(
        (ask) =>
          ask.askFrom === profile.userPro && ask.askTo === request.askFrom
      )

      if (prevRequests.length === 0) {
        const opositRequest = {
          askFrom: profile.userPro,
          askTo: request.askFrom,
          approved: true,
        }
        await axios.post(
          'http://127.0.0.1:8000/api/user/approval/',
          opositRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
      } else {
        prevRequests[0].approved = true
        if (prevRequests[0].id === null) throw new Error('request data error')
        await axios.put(
          `http://127.0.0.1:8000/api/user/approval/${prevRequests[0].id}/`,
          prevRequests[0],
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `token ${token}`,
            },
          }
        )
      }
    } catch (err: any) {
      console.log(err.message)
    }
  }

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

  return (
    <ApiContext.Provider
      value={{
        profile,
        profiles,
        editedProfile,
        setEditedProfile,
        friendRequestList,
        allFriendRequestList,
        inbox,
        cover,
        setCover,
        createProfile,
        updateProfile,
        deleteProfile,
        createFriendRequest,
        approveFriendRequest,
        sendDM,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}

export default withCookies(ApiContextProvider)
