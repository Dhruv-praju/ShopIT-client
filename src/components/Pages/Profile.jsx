import React from 'react'
import { useGetMyProfileQuery } from '../../features/user/userApiSlice'

const Profile = () => {
    const {data, isError, isSuccess, error} = useGetMyProfileQuery()
    console.log(data);
    console.log(error);
  return (
      <>
    {isError ?
        <h1>Error occured : {error.data.message}</h1>
    : isSuccess ?
        <>
          <h1>Successfully fetched user</h1>
        </>
    : null}
      </>
  )
}

export default Profile