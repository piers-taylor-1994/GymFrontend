const Version = {
    1.10: (
        <>
            <div className='image-container'>
                <img src='images/screenshot1.png' alt='screenshot1' />
            </div>
            <span>Added routine set placeholders so user can easily see what they did the last time they did an exercise.</span>
            <div className='image-container'>
                <img src='images/screenshot2.png' alt='screenshot1' />
            </div>
            <span>Added multiple muscle groups to each exercise.</span>
        </>
    ),
    1.20: (
        <>
            <div className='image-container' style={{background: "#2E2E2E"}}>
                <img src='images/screenshot3.png' alt='screenshot1' />
            </div>
            <span>Added leaderboard to nav.</span>
            <div className='image-container'>
                <img src='images/screenshot4.png' alt='screenshot1' />
            </div>
            <span>Added leaderboard page.</span>
        </>
    )
}
Object.freeze(Version);

export default Version;