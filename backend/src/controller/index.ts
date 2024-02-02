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
