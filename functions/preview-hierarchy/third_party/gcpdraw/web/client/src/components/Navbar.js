import React from 'react';
import {buglink} from '../config/links';


// const Search = props => (
//   <form className="form-inline"
//     method='get'
//     action='/diagrams'>
//     <div className='input-group'>
//       <input className="form-control gd-search-input" type="search" name='q'
//          placeholder="Search Diagram" />
//       <div className='input-group-append'>
//         <button type='submit'
//           className='btn btn-navy btn-sm'>
//           <i className='fas fa-search' />
//         </button>
//       </div>
//     </div>
//   </form>
// );

// <li className='nav-item'>
//   <a className='nav-link' href={contactlink} target='_blank'
//     rel='noopener noreferrer'>
//     Contact
//   </a>
// </li>


const Navbar = props => (
  <nav className='navbar navbar-dark bg-primary'>
    <div className='w-100 d-flex justify-content-between'>
      <a className='navbar-brand' href = '/'>gcpdraw (go/gcpdraw)</a>
      <ul className='navbar-nav flex-row align-items-center'>
        <li className='nav-item'>
          <a className='nav-link p-2'
            href='/mydiagrams'
            rel='noopener noreferrer'>
            My Diagrams
          </a>
        </li>
        {/*TODO(furuyama): remove comment out once we get enough access views*/}
        {/*<li className='nav-item'>*/}
        {/*  <a*/}
        {/*    className='nav-link p-2'*/}
        {/*    href='/popular'*/}
        {/*    rel='noopener noreferrer'>*/}
        {/*    Popular Diagrams*/}
        {/*  </a>*/}
        {/*</li>*/}
        <li className='nav-item'>
          <a className='nav-link p-2' href={buglink} target='_blank'
            rel='noopener noreferrer'>
            File Bug/Feature
          </a>
        </li>
        <li className='ml-2 nav-item'>
          <a href='/diagrams/new' className='btn btn-navy'>
            Create Diagram
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
