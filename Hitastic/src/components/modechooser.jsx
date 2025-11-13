
import { useState } from 'react';

export default function ModeChooser({darkMode, modeUpdated}) {


    return <div>
    <label htmlFor='mode'>Choose mode:</label>
    <select id='mode' defaultValue={darkMode} onChange={updateMode}>
    <option value='light'>Light mode</option>
    <option value='dark'>Dark mode</option>
    </select>
    </div>;

    function updateMode() {
        const mode = document.getElementById('mode').value;
        modeUpdated(mode);
    }
    
}
