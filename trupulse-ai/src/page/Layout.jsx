import React from 'react'
import './Layout.css'
import NoteList from '../component/noteList/noteList'
import Button from '../component/common/button/Button'

function Layout() {
  return (
    <div className='layout'>
        <div className="side-bar">
              <div className="heading">
                <h2>Note Taking</h2>
              </div>
              <div className="feature-section">
                  <Button>
                    Add
                  </Button>
              </div>
        </div>

        <div className="main-content">
             <div className="search-bar">

                 </div>

                 <div className="notes-list">
                      <NoteList/>
                 </div>
        </div>
    </div>
  )
}

export default Layout