import React from 'react'
import "../Sidebar/Sidebar.css"

export const Sidebar = () => {
    return (
    <div className="sidebar">
      <div className="logo d-flex justify-content-between">
        <div className="logo-name">
          SOCIAL KARMA
        </div>
      </div>
      <div className="vertical-menu pt-2">
        <ul>
          <li>
            <span>All unreads</span>
          </li>
          <li>
            <span>Threads</span>
          </li>
          <li>
            <span>Drafts</span>
          </li>
          <li>
            <span>Saved items</span>
          </li>
        </ul>
      </div>
    </div>
  );
}