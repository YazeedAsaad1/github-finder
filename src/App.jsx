import { useState, useEffect } from 'react'
import './App.css'
import search from './images/search.svg'

function App() {
  // State variables
  // Current user input in the search field
  const [theUser, setTheUser] = useState('')
  // Username to fetch data for
  const [theFinalData, setTheFinalData] = useState('yazeedasaad1')
  // Holds the fetched user data
  const [dataHolder, setDataHolder] = useState('')
  // Controls whether a user was found or not
  const [found, setFound] = useState(true)
  // Controls dark/light mode with persistence in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkmode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  // Save dark mode preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkmode', JSON.stringify(darkMode))
  }, [darkMode])

  // Fetch GitHub user data when theFinalData (username) changes
  useEffect(() => {
    fetch(`https://api.github.com/users/${theFinalData}`)
      .then(res => res.json())
      .then(data => {
        if(data.message === 'Not Found') {
          // If user not found, keep previous data and show error
          setDataHolder(prev => prev)
          setFound(false)
          setTheUser(prev => prev)
        } else {
          // If user found, update data and clear error
          setDataHolder(data)
          setFound(true)
          setTheUser('')
        }
      })
  }, [theFinalData])


  // Handle input field changes
  function handleChange(event) {
    const {value} = event.currentTarget
    setTheUser(value)
  }
  
  // Handle search button click
  function handleClick() {
    setTheFinalData(theUser)
  }
  
  // Handle Enter key in search field
  function handleEnter(event) {
    if(event.key === 'Enter') {
      event.preventDefault()
      handleClick()
    }
  }

  // Format GitHub API date by removing the time portion
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const indexOfT = dateString.indexOf('T');
    return dateString.substring(0, indexOfT);
  }

  return (
    <div className={`githubContainer ${darkMode ? "dark" : "light"}`}>
      <div className="justToMakeTheWidth">
        <div className="githubLogoAndMode">
          <h1>devfinder</h1>
          {!darkMode && <><span className='githubModeSpanDark' onClick={() => setDarkMode(prev => !prev)}>DARK</span><svg className='githubModeSpanDarkSvg' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5133 11.3967C19.3087 11.3453 19.1041 11.3966 18.9251 11.5251C18.2602 12.0901 17.4929 12.5523 16.649 12.8605C15.8562 13.1687 14.9866 13.3228 14.066 13.3228C11.9944 13.3228 10.1019 12.4753 8.74647 11.1142C7.39102 9.75302 6.54707 7.85258 6.54707 5.77237C6.54707 4.89919 6.70051 4.0517 6.95626 3.28125C7.23758 2.45944 7.64677 1.71467 8.18383 1.07263C8.414 0.790132 8.36285 0.379226 8.08153 0.148091C7.90251 0.0196826 7.69792 -0.0316807 7.49332 0.0196826C5.31949 0.61036 3.42698 1.92012 2.07153 3.66648C0.767234 5.38715 0 7.51872 0 9.83007C0 12.6294 1.12528 15.1719 2.96664 17.0209C4.808 18.87 7.3143 20 10.1275 20C12.4803 20 14.6542 19.1782 16.3932 17.8171C18.1579 16.4303 19.4366 14.4528 19.9737 12.1928C20.076 11.8332 19.8714 11.4737 19.5133 11.3967Z" fill="#697C9A" />
          </svg></>}
          {darkMode && <><span className='githubModeSpanLight' onClick={() => setDarkMode(prev => !prev)}>LIGHT</span><svg className='githubModeSpanLightSvg' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5451 6.45505C12.6456 5.55558 11.3757 4.97357 10.0001 4.97357C8.62443 4.97357 7.35459 5.52913 6.45511 6.45505C5.55564 7.35452 4.97363 8.62437 4.97363 10C4.97363 11.3757 5.55564 12.6455 6.45511 13.545C7.35459 14.4445 8.62443 15.0265 10.0001 15.0265C11.3757 15.0265 12.6456 14.4709 13.5451 13.545C14.4445 12.6455 15.0265 11.3757 15.0265 10C15.0265 8.62437 14.471 7.35452 13.5451 6.45505Z" fill="#FFFFFF" />
            <path d="M10.0001 3.4127C10.3705 3.4127 10.6879 3.09524 10.6879 2.72487V0.687831C10.6879 0.31746 10.3705 0 10.0001 0C9.62972 0 9.31226 0.31746 9.31226 0.687831V2.72487C9.31226 3.09524 9.62972 3.4127 10.0001 3.4127Z" fill="#FFFFFF" />
            <path d="M15.6349 5.34392L17.09 3.88889C17.3545 3.62434 17.3545 3.20106 17.09 2.93651C16.8254 2.67196 16.4021 2.67196 16.1376 2.93651L14.6825 4.39154C14.418 4.65609 14.418 5.07937 14.6825 5.34392C14.9206 5.60847 15.3439 5.60847 15.6349 5.34392Z" fill="#FFFFFF" />
            <path d="M19.3123 9.31219H17.2752C16.9049 9.31219 16.5874 9.62966 16.5874 10C16.5874 10.3704 16.9049 10.6879 17.2752 10.6879H19.3123C19.6826 10.6879 20.0001 10.3704 20.0001 10C20.0001 9.62966 19.6826 9.31219 19.3123 9.31219Z" fill="#FFFFFF" />
            <path d="M15.6086 14.6561C15.344 14.3915 14.9207 14.3915 14.6562 14.6561C14.3916 14.9206 14.3916 15.3439 14.6562 15.6084L16.1112 17.0635C16.3758 17.328 16.799 17.328 17.0636 17.0635C17.3281 16.7989 17.3281 16.3756 17.0636 16.1111L15.6086 14.6561Z" fill="#FFFFFF" />
            <path d="M10.0001 16.5873C9.62972 16.5873 9.31226 16.9047 9.31226 17.2751V19.3121C9.31226 19.6825 9.62972 20 10.0001 20C10.3705 20 10.6879 19.6825 10.6879 19.3121V17.2751C10.6879 16.9047 10.3705 16.5873 10.0001 16.5873Z" fill="#FFFFFF" />
            <path d="M4.36511 14.6561L2.91008 16.1111C2.64553 16.3756 2.64553 16.7989 2.91008 17.0635C3.17463 17.328 3.59791 17.328 3.86246 17.0635L5.31749 15.6084C5.58204 15.3439 5.58204 14.9206 5.31749 14.6561C5.07939 14.3915 4.65611 14.3915 4.36511 14.6561Z" fill="#FFFFFF" />
            <path d="M3.4127 10C3.4127 9.62966 3.09524 9.31219 2.72487 9.31219H0.687831C0.31746 9.31219 0 9.62966 0 10C0 10.3704 0.31746 10.6879 0.687831 10.6879H2.72487C3.09524 10.6879 3.4127 10.3704 3.4127 10Z" fill="#FFFFFF" />
            <path d="M4.36511 5.34392C4.62966 5.60847 5.05294 5.60847 5.31749 5.34392C5.58204 5.07937 5.58204 4.65609 5.31749 4.39154L3.86246 2.93651C3.59791 2.67196 3.17463 2.67196 2.91008 2.93651C2.64553 3.20106 2.64553 3.62434 2.91008 3.88889L4.36511 5.34392Z" fill="#FFFFFF" />
          </svg></>}
        </div>
        <div className="githubSearchForm">  
          <form className='githubForm' onSubmit={(e) => e.preventDefault()}>
            <img src={search} width={20} />
            <input
              type='text'
              value={theUser}
              onChange={handleChange}
              onKeyDown={handleEnter}
              className='searchUsernameInput'
              placeholder='Search GitHub username…'
              name='searchUsername' />
              {!found && <span className='noResults'>No results</span>}
            <button type="button"  onClick={handleClick} className='githubformButton'>Search</button>
          </form>
        </div>

        <div className="githubTheContent">
          <div className="githubSizeControler">
            <div className='githubTheContentImage'><img src={dataHolder.avatar_url} /></div>

            <div className='githubContent'>
              <div className='githubTitleAndDate'>
                <div className='githubTitleHeaderBigSize'>
                  <div className='githubTitle'>
                    <h1>{dataHolder.name}</h1>
                    <a href={dataHolder.html_url}><span>@{dataHolder.login}</span></a>
                  </div>
                  <p>Joined {dataHolder?.created_at && formatDate(dataHolder.created_at)}</p>
                </div>
                <div className='githubDisplayNone'>
                  <img src={dataHolder.avatar_url} />
                  <div className='githubTitleHeaderBigSize2'>
                    <div className='githubTitle'>
                      <h1>{dataHolder.name}</h1>
                      <a href={dataHolder.html_url}><span>@{dataHolder.login}</span></a>
                    </div>
                    <p>Joined {dataHolder?.created_at && formatDate(dataHolder.created_at)}</p>
                  </div>
                </div>
                <p className='githubRemoveParagraph'>{dataHolder.bio}</p>
              </div>

              <div className='githubFollowers'>
                <div className='githubRepos'>
                  <p className='githubReposWord'>Repos</p>
                  <p className='githubReposNumber'>{dataHolder.public_repos}</p>
                </div>
                <div className='githubTheFollowers'>
                  <p className='githubTheFollowersWord'>Followers</p>
                  <p className='githubTheFollowersNumber'>{dataHolder.followers}</p>
                </div>
                <div className='githubFollowing'>
                  <p className='githubFollowingWord'>Following</p>
                  <p className='githubFollowingNumber'>{dataHolder.following}</p>
                </div>
              </div>
              <div className='githubInfomations'>
                <div className='githubLocationAndLink'>

                  <div className={dataHolder.location ? 'availableInfo' : 'notAvailableInfo'}>
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.03013 0.00158203C9.42758 0.0504882 11.5835 1.33021 12.7973 3.4249C14.038 5.56599 14.072 8.13786 12.8882 10.3047L7.92872 19.3823L7.92196 19.3943C7.7038 19.7736 7.3129 20 6.87634 20C6.43974 20 6.04884 19.7736 5.83064 19.3943L5.82388 19.3823L0.86439 10.3047C-0.319437 8.13786 -0.285492 5.56599 0.95521 3.4249C2.16904 1.33021 4.32497 0.0504882 6.72239 0.00158203C6.82477 -0.000527343 6.92778 -0.000527343 7.03013 0.00158203ZM4.06376 6.25001C4.06376 7.80083 5.32544 9.06251 6.87626 9.06251C8.42712 9.06251 9.68876 7.80083 9.68876 6.25001C9.68876 4.69919 8.42708 3.43752 6.87626 3.43752C5.32544 3.43752 4.06376 4.69919 4.06376 6.25001Z" fill="#4B6A9B" />
                    </svg>
                    <p className='githubLocationParagraph'>{dataHolder.location !== null ? dataHolder.location : 'Not Available'}</p>
                  </div>

                  <div className={dataHolder.blog ? 'availableInfo' : 'notAvailableInfo'}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.40416 5.01207C5.04862 7.44921 5.56264 11.4937 8.26088 13.2854C8.34979 13.3445 8.46807 13.3328 8.54444 13.2582C9.11248 12.7031 9.59303 12.1655 10.0138 11.4817C10.0782 11.3771 10.0381 11.2414 9.93014 11.1829C9.51858 10.9599 9.10905 10.5418 8.8785 10.1002L8.87823 10.1003C8.60205 9.55042 8.50803 8.93398 8.65424 8.29734C8.6544 8.29738 8.65455 8.29742 8.65471 8.29742C8.82295 7.48234 9.69799 6.72414 10.3663 6.02293C10.3649 6.02246 10.3635 6.02195 10.3621 6.02148L12.8662 3.46578C13.864 2.44731 15.5054 2.43891 16.5137 3.44715C17.5321 4.445 17.549 6.09468 16.5511 7.11312L15.0344 8.67281C14.9642 8.74499 14.9414 8.85031 14.9743 8.9455C15.3235 9.9582 15.4094 11.3861 15.1754 12.465C15.1688 12.4951 15.2061 12.5149 15.2277 12.4928L18.4557 9.19816C20.5179 7.09347 20.5004 3.66676 18.4168 1.58324C16.2906 -0.543044 12.829 -0.525348 10.7246 1.6225L7.41709 4.99824C7.41272 5.00285 7.40858 5.00754 7.40416 5.01207Z" fill="#4B6A9B" />
                      <path d="M13.439 13.7495C13.4389 13.7496 13.4388 13.7497 13.4388 13.7499C13.4409 13.749 13.4428 13.7482 13.4449 13.7473C14.1036 12.5426 14.2333 11.161 13.9246 9.81419L13.9232 9.81564L13.9217 9.81498C13.6285 8.61541 12.8241 7.42424 11.7316 6.69084C11.6376 6.62775 11.4875 6.63506 11.3995 6.70623C10.8461 7.15369 10.3044 7.72748 9.94697 8.4597C9.89083 8.57466 9.93287 8.71275 10.0435 8.77697C10.4583 9.01779 10.8329 9.37037 11.0837 9.83845L11.0841 9.83818C11.2796 10.1688 11.4722 10.7963 11.3474 11.4704C11.3474 11.4704 11.3472 11.4704 11.3472 11.4704C11.2308 12.3642 10.3282 13.184 9.61068 13.9228L9.61103 13.9231C9.06486 14.4817 7.67646 15.897 7.12052 16.465C6.12267 17.4834 4.47299 17.5003 3.45455 16.5024C2.43612 15.5046 2.41928 13.8549 3.41713 12.8365L4.93834 11.2721C5.00728 11.2012 5.03072 11.0981 5.00006 11.0041C4.66228 9.96775 4.56975 8.57201 4.78295 7.49439C4.78889 7.46435 4.75193 7.44517 4.73049 7.46705L1.551 10.7122C-0.53228 12.8384 -0.514624 16.3003 1.5903 18.4052C3.71647 20.4884 7.16049 20.4532 9.24369 18.327C9.9674 17.5175 13.0654 14.6492 13.439 13.7495Z" fill="#4B6A9B" />
                    </svg>
                    <p className='githubUrlParagraph'>{dataHolder.blog !== "" ? <a href={dataHolder.blog}>{dataHolder.blog}</a> : 'Not Available'}</p>
                  </div>

                </div>

                <div className='githubTwitterAndAt'>

                  <div className={dataHolder.twitter_username ? 'availableInfo' : 'notAvailableInfo'}>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 2.79875C19.2562 3.125 18.4637 3.34125 17.6375 3.44625C18.4875 2.93875 19.1362 2.14125 19.4412 1.18C18.6487 1.6525 17.7737 1.98625 16.8412 2.1725C16.0887 1.37125 15.0162 0.875 13.8462 0.875C11.5762 0.875 9.74874 2.7175 9.74874 4.97625C9.74874 5.30125 9.77624 5.61375 9.84374 5.91124C6.43499 5.745 3.41875 4.11125 1.3925 1.6225C1.03875 2.23625 0.831249 2.93875 0.831249 3.695C0.831249 5.115 1.5625 6.37374 2.6525 7.10249C1.99375 7.08999 1.3475 6.89874 0.799999 6.59749C0.799999 6.60999 0.799999 6.62624 0.799999 6.64249C0.799999 8.63499 2.22125 10.29 4.085 10.6712C3.75125 10.7625 3.3875 10.8062 3.01 10.8062C2.7475 10.8062 2.4825 10.7912 2.23375 10.7362C2.765 12.36 4.2725 13.5537 6.06499 13.5925C4.67 14.6837 2.89875 15.3412 0.981249 15.3412C0.644999 15.3412 0.3225 15.3262 0 15.285C1.81625 16.4562 3.96875 17.125 6.28999 17.125C13.835 17.125 17.96 10.875 17.96 5.4575C17.96 5.27625 17.9537 5.10125 17.945 4.9275C18.7587 4.35 19.4425 3.62875 20 2.79875Z" fill="#4B6A9B" />
                    </svg>
                    <p className='githubTwitterParagraph'>{dataHolder.twitter_username !== null ? dataHolder.twitter_username : 'Not Available'}</p>
                  </div>

                  <div className={dataHolder.company ? 'availableInfo' : 'notAvailableInfo'}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8583 1.55832L1.7 0.16665C1.275 0.0999838 0.841666 0.21665 0.516666 0.49165C0.191666 0.774983 0 1.18332 0 1.60832V19.1666C0 19.625 0.375 20 0.833333 20H3.54166V15.625C3.54166 14.8166 4.19166 14.1666 5 14.1666H7.08333C7.89166 14.1666 8.54166 14.8166 8.54166 15.625V20H12.0833V2.99998C12.0833 2.28331 11.5667 1.67498 10.8583 1.55832ZM4.58333 12.2916H3.33333C2.98833 12.2916 2.70833 12.0116 2.70833 11.6666C2.70833 11.3216 2.98833 11.0416 3.33333 11.0416H4.58333C4.92833 11.0416 5.20833 11.3216 5.20833 11.6666C5.20833 12.0116 4.92833 12.2916 4.58333 12.2916ZM3.33333 9.79164H4.58333C4.92833 9.79164 5.20833 9.51164 5.20833 9.16664C5.20833 8.82164 4.92833 8.54164 4.58333 8.54164H3.33333C2.98833 8.54164 2.70833 8.82164 2.70833 9.16664C2.70833 9.51164 2.98833 9.79164 3.33333 9.79164ZM4.58333 7.29164H3.33333C2.98833 7.29164 2.70833 7.01164 2.70833 6.66664C2.70833 6.32164 2.98833 6.04164 3.33333 6.04164H4.58333C4.92833 6.04164 5.20833 6.32164 5.20833 6.66664C5.20833 7.01164 4.92833 7.29164 4.58333 7.29164ZM3.33333 4.79165H4.58333C4.92833 4.79165 5.20833 4.51165 5.20833 4.16665C5.20833 3.82165 4.92833 3.54165 4.58333 3.54165H3.33333C2.98833 3.54165 2.70833 3.82165 2.70833 4.16665C2.70833 4.51165 2.98833 4.79165 3.33333 4.79165ZM8.74999 12.2916H7.49999C7.15499 12.2916 6.87499 12.0116 6.87499 11.6666C6.87499 11.3216 7.15499 11.0416 7.49999 11.0416H8.74999C9.09499 11.0416 9.37499 11.3216 9.37499 11.6666C9.37499 12.0116 9.09499 12.2916 8.74999 12.2916ZM7.49999 9.79164H8.74999C9.09499 9.79164 9.37499 9.51164 9.37499 9.16664C9.37499 8.82164 9.09499 8.54164 8.74999 8.54164H7.49999C7.15499 8.54164 6.87499 8.82164 6.87499 9.16664C6.87499 9.51164 7.15499 9.79164 7.49999 9.79164ZM8.74999 7.29164H7.49999C7.15499 7.29164 6.87499 7.01164 6.87499 6.66664C6.87499 6.32164 7.15499 6.04164 7.49999 6.04164H8.74999C9.09499 6.04164 9.37499 6.32164 9.37499 6.66664C9.37499 7.01164 9.09499 7.29164 8.74999 7.29164ZM7.49999 4.79165H8.74999C9.09499 4.79165 9.37499 4.51165 9.37499 4.16665C9.37499 3.82165 9.09499 3.54165 8.74999 3.54165H7.49999C7.15499 3.54165 6.87499 3.82165 6.87499 4.16665C6.87499 4.51165 7.15499 4.79165 7.49999 4.79165Z" fill="#4B6A9B" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9166 7.79248L18.85 9.03498C19.5308 9.18581 20 9.77165 20 10.46V18.5416C20 19.3458 19.3458 20 18.5416 20H12.9166V7.79248ZM15.625 17.5H16.875C17.22 17.5 17.5 17.22 17.5 16.875C17.5 16.53 17.22 16.25 16.875 16.25H15.625C15.28 16.25 15 16.53 15 16.875C15 17.22 15.28 17.5 15.625 17.5ZM16.875 15H15.625C15.28 15 15 14.72 15 14.375C15 14.03 15.28 13.75 15.625 13.75H16.875C17.22 13.75 17.5 14.03 17.5 14.375C17.5 14.72 17.22 15 16.875 15ZM15.625 12.5H16.875C17.22 12.5 17.5 12.22 17.5 11.875C17.5 11.53 17.22 11.25 16.875 11.25H15.625C15.28 11.25 15 11.53 15 11.875C15 12.22 15.28 12.5 15.625 12.5Z" fill="#4B6A9B" />
                    </svg>
                    <p className='githubBuildingParagraph'>{dataHolder.company !== null ? `@${dataHolder.company}` : 'Not Available'}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
