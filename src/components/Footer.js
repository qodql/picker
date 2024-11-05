import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div className='footer-top'>
            <ul className='footer-link'>
                <li><Link to='#'>이용약관</Link></li>
                <li><Link to='#'>개인정보처리방침</Link></li>
                <li><Link to='#'>고객센터</Link></li>
                <li><Link to='#'>채용정보</Link></li>
            </ul>
            <ul className='footer-sns'>
                <li><Link href='#'></Link></li>
                <li><Link href='#'></Link></li>
                <li><Link href='#'></Link></li>
            </ul>
        </div>
        <div className='footer-bottom'>
            <ul className='footer-info'>
                <li>
                    <span>주소</span>
                    <span>서울특별시 영등포구 여의나루로 60 포스트타워 19층</span>
                </li>
                <li>
                    <span>사업자등록번호</span>
                    <span>220-88-38020</span>
                </li>
                <li>
                    <span>대표전화</span>
                    <span>1599-3799</span>
                </li>
                <li>
                    <span>Copyright© All rights reserved.</span>
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer