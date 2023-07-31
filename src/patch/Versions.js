const Version = {
    1.10: (
        <>
            <div className='image-container'>
                <img src='images/screenshot1.png' alt='screenshot' />
            </div>
            <ul><li>Added routine set placeholders so user can easily see what they did the last time they did an exercise.</li></ul>
            <div className='image-container'>
                <img src='images/screenshot2.png' alt='screenshot' />
            </div>
            <ul><li>Added multiple muscle groups to each exercise.</li></ul>
        </>
    ),
    1.20: (
        <>
            <div className='image-container' style={{background: "#2E2E2E"}}>
                <img src='images/screenshot3.png' alt='screenshot' />
            </div>
            <ul><li>Added leaderboard to nav.</li></ul>
            <div className='image-container'>
                <img src='images/screenshot4.png' alt='screenshot' />
            </div>
            <ul><li>Added leaderboard page.</li></ul>
        </>
    ),
    1.30: (
        <>
            <div className='image-container'>
                <img src='images/screenshot5.png' alt='screenshot' />
            </div>
            <ul><li>User can now add routine templates.</li></ul>
            <div className='image-container'>
                <img src='images/screenshot6.png' alt='screenshot' />
            </div>
            <ul><li>Once a template has been added, users can now select routine templates to pre-populate routine page.</li></ul>
        </>
    ),
    1.31: (
        <>
            <div className='image-container'>
                <img src='images/screenshot7.png' alt='screenshot' />
            </div>
            <ul><li>History has been revamped.</li></ul>
        </>
    ),
    1.311: (
        <>
            <div className='image-container'>
                <img src='images/screenshot8.png' alt='screenshot' />
            </div>
            <ul>
                <li>History design tweaked.</li>
                <li>Workouts for the month now displayed next to date.</li>
            </ul>
        </>
    ),
    1.312: (
        <>
            <div className='image-container'>
                <img src='images/screenshot9.png' alt='screenshot' />
            </div>
            <ul>
                <li>History navigation redesigned.</li>
                <li>Arrows will show when a user has a month to navigate from/to.</li>
            </ul>
        </>
    ),
    1.313: (
        <>
            <div className='image-container'>
                <img src='images/screenshot10.png' alt='screenshot' />
            </div>
            <ul>
                <li>Home page redesigned.</li>
                <li>Now show weekly/monthly count of workouts registered.</li>
                <li>Also shows status colour depending on how you did compared to last week/month.</li>
            </ul>
            <div className='image-container'>
                <img src='images/screenshot11.png' alt='screenshot' />
            </div>
            <ul>
                <li>Home page button added.</li>
            </ul>
        </>
    )
}
Object.freeze(Version);

export default Version;