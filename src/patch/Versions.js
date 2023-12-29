import * as Icon from '../layout/Icons';

const Version = {
    1.10: (
        <div className="version">
            <span className="version-header">Routines + workouts tweaked</span>
            <div className='image-container'>
                <img src='images/screenshot1.png' alt='screenshot' />
            </div>
            <ul><li>Routine set placeholders added so the user can see what they achieved last time they worked the exercise out.</li></ul>
            <div className='image-container'>
                <img src='images/screenshot2.png' alt='screenshot' />
            </div>
            <ul><li>Added multiple muscle groups to each exercise.</li></ul>
        </div>
    ),
    1.20: (
        <div className="version">
            <span className="version-header">Leaderboard added</span>
            <div className='image-container' style={{ background: "#2E2E2E" }}>
                <img src='images/screenshot3.png' alt='screenshot' />
            </div>
            <div className='image-container'>
                <img src='images/screenshot4.png' alt='screenshot' />
            </div>
            <ul><li>Learderboard page + subsequent nav button added.</li></ul>
        </div>
    ),
    1.30: (
        <div className="version">
            <span className="version-header">Routine templates added</span>
            <div className='image-container'>
                <img src='images/screenshot5.png' alt='screenshot' />
            </div>
            <div className='image-container'>
                <img src='images/screenshot6.png' alt='screenshot' />
            </div>
            <ul><li>Once a template has been added, users can now select routine templates to pre-populate routine page.</li></ul>
        </div>
    ),
    1.31: (
        <div className="version">
            <span className="version-header">History has been revamped</span>
            <div className='image-container'>
                <img src='images/screenshot7.png' alt='screenshot' />
            </div>
            <ul><li>History dropdown list =&gt; history tiles.</li></ul>
        </div>
    ),
    1.311: (
        <div className="version">
            <span className="version-header">History design tweaked</span>
            <div className='image-container'>
                <img src='images/screenshot8.png' alt='screenshot' />
            </div>
            <ul>
                <li>Workouts for the month now displayed next to date.</li>
            </ul>
        </div>
    ),
    1.312: (
        <div className="version">
            <span className="version-header">History navigation redesigned</span>
            <div className='image-container'>
                <img src='images/screenshot9.png' alt='screenshot' />
            </div>
            <ul>
                <li>User can now swipe to navigate months.</li>
                <li>Arrows will show when a user has a month to navigate from/to.</li>
            </ul>
        </div>
    ),
    1.313: (
        <div className="version">
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
        </div>
    ),
    2.00: (
        <div className="version">
            <span className="version-header">App name and logo added</span>
            <div className='image-container'>
                <img src='images/screenshot12.png' alt='screenshot' />
            </div>
            <ul>
                <li>To update app's name and display in your app draw, the user will have to uninstall the app, and then reinstall it from the website.</li>
                <li>Copy the website URL by clicking <span className="hyperlink" onClick={() => navigator.clipboard.writeText("https://delightful-ground-052848a03.3.azurestaticapps.net/")}>here.</span></li>
            </ul>
        </div>
    ),
    2.10: (
        <div className="version">
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
        </div>
    ),
    2.11: (
        <div className="version">
            <span className="version-header">Users can now add weightless exercises</span>
            <div className='image-container'>
                <img src='images/screenshot15.png' alt='screenshot' />
            </div>
            <ul>
                <li>Users can set the weight to 0 on bodyweight exercises.</li>
            </ul>
        </div>
    ),
    2.12: (
        <div className="version">
            <span className="version-header">Routine drag & drop updated</span>
            <div className='image-container'>
                <img src='images/screenshot16.png' alt='screenshot' />
            </div>
            <ul>
                <li>Drag & drop will now only activate after the user has pressed for half a second.</li>
                <li>Routine rows now wider.</li>
                <li>Fixed intermittent placeholder bug.</li>
            </ul>
        </div>
    ),
    2.13: (
        <div className="version">
            <span className="version-header">Colour-coding added to history</span>
            <div className='image-container'>
                <img src='images/screenshot17.png' alt='screenshot' />
            </div>
            <ul>
                <li>Each history square is now colour-coded depending on muscles worked.</li>
                <li>Magenta for upper, green for core and blue for lowers.</li>
            </ul>
        </div>
    ),
    2.20: (
        <div className="version">
            <span className="version-header">Users can now add multiple sets per exercise</span>
            <div className='image-container'>
                <img src='images/screenshot18.png' alt='screenshot' />
            </div>
            <ul>
                <li>Each exercise will have a <div style={{"height": "1em", "width": "1em", "display": "inline-block"}}><Icon.AddSquare /></div> that'll add additional set rows.</li>
            </ul>
            <div className='image-container'>
                <img src='images/screenshot19.png' alt='screenshot' />
            </div>
            <ul>
                <li>This will be displayed in the routine history.</li>
            </ul>
        </div>
    ),
    2.30: (
        <div className="version">
            <span className="version-header">Users can now edit/delete routine templates</span>
            <div className='image-container'>
                <img src='images/screenshot20.png' alt='screenshot' />
            </div>
            <ul>
                <li>When a routine template is selected, users will now see the new edit button.</li>
            </ul>
            <div className='image-container'>
                <img src='images/screenshot21.png' alt='screenshot' />
            </div>
            <ul>
                <li>This reveals a new modal that allows users to edit/delete the selected routine template.</li>
            </ul>
        </div>
    ),
    2.31: (
        <div className="version">
            <span className="version-header">Routine drag n drop redesigned + general tweaks</span>
            <div className='image-container'>
                <img src='images/screenshot22.png' alt='screenshot' />
            </div>
            <ul>
                <li>Users now can reorder by using the new drag icon.</li>
                <li>The DnD delay has been removed.</li>
                <br />
                <li>Nav has shrunk slightly to give the UI more space.</li>
                <li>Loaders have been tweaked.</li>
            </ul>
        </div>
    ),
    2.41: (
        <div className="version">
            <span className="version-header">Recent workouts added</span>
            <div className='image-container'>
                <img src='images/screenshot23.png' alt='screenshot' />
            </div>
            <ul>
                <li>Users can now see the 5 most recent workouts on the home page.</li>
                <li>Layout is WIP.</li>
            </ul>
        </div>
    )
}
Object.freeze(Version);

export default Version;