import jwt from 'jsonwebtoken'
import pool from '../database/connection'

export const saveSubscribeUsers = async({ id, email }) => {
  try {

    const findUserQuery = `
    SELECT 1 FROM SubscribeUsers WHERE cryptoID = $1 and email = $2
    `;

    const findExitingData = await pool.query(findUserQuery, [id, email])

    if(findExitingData.rows[0]) {
      return {
        success: false,
        message: 'This user has already subscribe to this crypto quotes.',
        errorCheck: {}
      }
    }

    const query = `
    INSERT INTO SubscribeUsers (cryptoID, email)
    VALUES ($1, $2)
    RETURNING *;
    `
    const subscribeUser = await pool.query(query, [id, email])
    return {
      data: subscribeUser.rows[0],
      success: true,
      message:  "You have successfully subscribe to getting quotes.",
      errorCheck: {}
    }
  } catch(error){
    return {
      success: false,
      message: error.message,
      errorCheck: error
    }
  }
}

export const getUser = async (token: string) => {

  const findUserQuery = `
    SELECT 1 FROM cryptoUsers WHERE email = $1
    `;
  const  decodeValue = jwt.verify(token, process.env.SECRET)

  try {
    const user = await pool.query(findUserQuery, [decodeValue.payload.userId]);

    if(!user.rows[0]){
      return {
        success : false,
        errorCheck: {}
      }
    }
    return {
      success: true,
      errorCheck: {}
    }
  } catch(error) {
    return {
      success: false,
      errorCheck: error
    }
  }
}

export const findAllSubscribedUsers = async () => {
  const findAllSubscribedUser = `
  SELECT cryptoID, email FROM SubscribeUsers;
  `
  try {
    const res = await pool.query(findAllSubscribedUser);
    return res.rows
  } catch(error) {
    console.log('error in fetch all user method >>>>>> ', error)
    throw new Error('Can not retrieve all users')
  }
}
