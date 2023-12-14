import "../../../css/admin/theme.min.css";
import React from 'react';
import { Button } from 'antd';

export default function SideBarMenu() {

    return (
        <>
        {/* Sidebar */}
        <div className="navbar-vertical navbar nav-dashboard">
          <div className="h-100" data-simplebar="">
            {/* Brand logo */}
            <a className="navbar-brand" href="index.html">
              <img src="assets/images/brand/logo/logo-2.svg" alt="dash ui" />
            </a>
            {/* Navbar nav */}
            <ul className="navbar-nav flex-column" id="sideNavbar">
              {/* Nav item */}
              <li className="nav-item">
                <a className="nav-link has-arrow" href="#!">
                  <i data-feather="home" className="nav-icon me-2 icon-xxs" />
                  Dashboard
                </a>
              </li>
              {/* Nav item */}
              <li className="nav-item">
                <div className="navbar-heading">Apps</div>
              </li>
              {/* Nav item */}
              <li className="nav-item">
                <a className="nav-link has-arrow " href="pages/calendar.html">
                  <i
                    data-feather="calendar"
                    className="nav-icon me-2 icon-xxs"
                  ></i>{" "}
                  Calendar
                </a>
              </li>
              {/* Nav item */}
              <li className="nav-item">
                <a className="nav-link has-arrow " href="pages/chat-app.html">
                  <i
                    data-feather="message-square"
                    className="nav-icon me-2 icon-xxs"
                  ></i>{" "}
                  Chat
                </a>
              </li>
              {/* Nav item */}
              <li className="nav-item">
                <a className="nav-link  " href="pages/apps-file-manager.html">
                  <i
                    data-feather="folder-plus"
                    className="nav-icon me-2 icon-xxs"
                  >
                    {" "}
                  </i>
                  File Manager
                </a>
              </li>
               {/* Nav item */}
              <li className="nav-item">
                <a
                  className="nav-link   collapsed  "
                  href="#!"
                  data-bs-toggle="collapse"
                  data-bs-target="#navprofilePages"
                  aria-expanded="false"
                  aria-controls="navprofilePages"
                >
                  <i data-feather="user" className="nav-icon me-2 icon-xxs"></i>{" "}
                  Profile
                </a>
                <div
                  id="navprofilePages"
                  className="collapse "
                  data-bs-parent="#sideNavbar"
                >
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-overview.html">
                        Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-project.html">
                        Project
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-files.html">
                        Files
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-team.html">
                        Team
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        href="pages/profile-followers.html"
                      >
                        Followers
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-activity.html">
                        Activity
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="pages/profile-settings.html">
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Nav item */}
              <li className="nav-item">
                <a
                  className="nav-link has-arrow  collapsed "
                  href="#!"
                  data-bs-toggle="collapse"
                  data-bs-target="#navblog"
                  aria-expanded="false"
                  aria-controls="navblog"
                >
                  <i data-feather="edit" className="nav-icon me-2 icon-xxs"></i>{" "}
                  Blog
                </a>
                <div
                  id="navblog"
                  className="collapse "
                  data-bs-parent="#sideNavbar"
                >
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a
                        className="nav-link has-arrow "
                        href="pages/blog-author.html"
                      >
                        Author
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link has-arrow "
                        href="pages/blog-author-detail.html"
                      >
                        Detail
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link has-arrow "
                        href="pages/create-blog-post.html"
                      >
                        Create Post
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
}
