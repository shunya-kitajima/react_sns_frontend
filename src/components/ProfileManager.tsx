import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LocationOn from '@material-ui/icons/LocationOn'
import { IconButton } from '@material-ui/core'
import { BsPersonCheckFill, BsPersonPlus, BsTrash } from 'react-icons/bs'
import { MdAddAPhoto } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { ApiContext } from '../context/ApiContext'

const useStyles = makeStyles(() => ({
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
      margin: 6,
    },
    '& .profile-image': {
      width: 150,
      height: 150,
      objectFit: 'cover',
      maxwidth: '100%',
      borderRadius: '50%',
      backgroundColor: 'white',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
        color: 'lightgray',
        fontFamily: '"Comic Neue", cursive',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 7px 0',
    },
  },
}))

const ProfileManager: React.FC = () => {
  const classes = useStyles()
  const {
    profile,
    editedProfile,
    setEditedProfile,
    cover,
    setCover,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useContext(ApiContext)

  const handleEditImage = (): void => {
    const fileInput = document.getElementById('imageInput') as HTMLElement
    fileInput.click()
  }

  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        {profile.img !== '' ? (
          <img src={profile.img} alt="profile" className="profile-image" />
        ) : (
          <img
            src="http://127.0.0.1:8000/media/image/null.png"
            alt="profile"
            className="profile-image"
          />
        )}
        <input
          type="file"
          id="imageInput"
          hidden
          onChange={(e) => {
            if (e.target?.files !== null) {
              setCover({ imgFile: e.target?.files[0] })
            } else {
              setCover({
                imgFile: new File(['dummy'], 'dummy.txt', {
                  type: 'text/plain',
                }),
              })
            }
            e.target.value = ''
          }}
        />
        <IconButton onClick={() => handleEditImage()}>
          <MdAddAPhoto className="photo" />
        </IconButton>
      </div>
      {editedProfile.id !== null ? (
        editedProfile.nickName !== '' ? (
          <button className="user" onClick={async () => await updateProfile()}>
            <FaUserEdit />
          </button>
        ) : (
          <button className="user-invalid" disabled>
            <FaUserEdit />
          </button>
        )
      ) : editedProfile.nickName !== '' && cover.imgFile.name !== '' ? (
        <button className="user" onClick={async () => await createProfile()}>
          <BsPersonPlus />
        </button>
      ) : (
        <button className="user-invalid" disabled>
          <BsPersonPlus />
        </button>
      )}
      <button className="trash" onClick={async () => await deleteProfile()}>
        <BsTrash />
      </button>
      <div className="profile-details">
        <BsPersonCheckFill className="badge" />
        {profile.id !== null && <span>{profile.nickName}</span>}
        <hr />
        <input
          type="text"
          value={editedProfile.nickName}
          name="nickName"
          onChange={(e) =>
            setEditedProfile({ ...editedProfile, nickName: e.target.value })
          }
        />
        <hr />
        <span>Joined at {profile.created_at}</span>
        <hr />
        <LocationOn />
        <span>Japan</span>
      </div>
    </div>
  )
}

export default ProfileManager
