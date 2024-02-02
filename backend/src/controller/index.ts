import pool from '../database/connection'

export const saveUser = async({ id, email }) => {
  try {

    const findUserQuery = `
    SELECT 1 FROM cryptoUsers WHERE cryptoID = $1 and email = $2
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
    INSERT INTO cryptoUsers (cryptoID, email)
    VALUES ($1, $2)
    RETURNING *;
    `
    const  user = await pool.query(query, [id, email])
    return {
      data: user.rows[0],
      success: true,
      message:  "The user was added successfully.",
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
