const Version = {
    1.10: (
        <>
            <span className="version-header">Routines + workouts tweaked</span>
            <div className='image-container'>
                <img src='images/screenshot1.png' alt='screenshot' />
            </div>
            <ul><li>Routine set placeholders added so the user can see what they achieved last time they worked the exercise out.</li></ul>
            <div className='image-container'>
                <img src='images/screenshot2.png' alt='screenshot' />
            </div>
            <ul><li>Added multiple muscle groups to each exercise.</li></ul>
        </>
    ),
    1.20: (
        <>
            <span className="version-header">Leaderboard added</span>
            <div className='image-container' style={{ background: "#2E2E2E" }}>
                <img src='images/screenshot3.png' alt='screenshot' />
            </div>
            <div className='image-container'>
                <img src='images/screenshot4.png' alt='screenshot' />
            </div>
            <ul><li>Learderboard page + subsequent nav button added.</li></ul>
        </>
    ),
    1.30: (
        <>
            <span className="version-header">Routine templates added</span>
            <div className='image-container'>
                <img src='images/screenshot5.png' alt='screenshot' />
            </div>
            <div className='image-container'>
                <img src='images/screenshot6.png' alt='screenshot' />
            </div>
            <ul><li>Once a template has been added, users can now select routine templates to pre-populate routine page.</li></ul>
        </>
    ),
    1.31: (
        <>
            <span className="version-header">History has been revamped</span>
            <div className='image-container'>
                <img src='images/screenshot7.png' alt='screenshot' />
            </div>
            <ul><li>History dropdown list =&gt; history tiles.</li></ul>
        </>
    ),
    1.311: (
        <>
            <span className="version-header">History design tweaked</span>
            <div className='image-container'>
                <img src='images/screenshot8.png' alt='screenshot' />
            </div>
            <ul>
                <li>Workouts for the month now displayed next to date.</li>
            </ul>
        </>
    ),
    1.312: (
        <>
            <span className="version-header">History navigation redesigned</span>
            <div className='image-container'>
                <img src='images/screenshot9.png' alt='screenshot' />
            </div>
            <ul>
                <li>User can now swipe to navigate months.</li>
                <li>Arrows will show when a user has a month to navigate from/to.</li>
            </ul>
        </>
    ),
    1.313: (
        <>
            <span className="version-header">Home page redesigned</span>
            <div className='image-container'>
                <img src='images/screenshot10.png' alt='screenshot' />
            </div>
            <ul>
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
    ),
    2.00: (
        <>
            <span className="version-header">App name and logo added</span>
            <div className='image-container'>
                <img src='images/screenshot12.png' alt='screenshot' />
            </div>
            <ul>
                <li>To update app's name and display in your app draw, the user will have to uninstall the app, and then reinstall it from the website.</li>
                <li>Copy the website URL by clicking <span className="hyperlink" onClick={() => navigator.clipboard.writeText("https://delightful-ground-052848a03.3.azurestaticapps.net/")}>here.</span></li>
            </ul>
        </>
    ),
    2.10: (
        <>
            <span className="version-header">Users can now add exercises</span>
            <div className='image-container'>
                <img src='images/screenshot13.png' alt='screenshot' />
            </div>
            <div className='image-container'>
                <img src='images/screenshot14.png' alt='screenshot' />
            </div>
            <ul>
                <li>When a user searches for a workout that isn't there, they will be presented with a button to let them add a new workout.</li>
                <li>A modal will then appear, where the user will add the name and muscles affected by the workout.</li>
            </ul>
        </>
    )
}
Object.freeze(Version);

export default Version;