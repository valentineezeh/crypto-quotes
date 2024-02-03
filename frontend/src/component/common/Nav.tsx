export const Navigation = () => {

  const onLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = ('/')
  }

  return (
    <nav className="navbar">
    <ul>
      <button className="logout-button" onClick={onLogOut}>
        Log out
      </button>
    </ul>
  </nav>
  )
}