import React from 'react'
import { VscBell, VscError, VscFeedback, VscRemote, VscSourceControl, VscWarning } from 'react-icons/vsc'

const FooterToolbar = () => {
  return (
    <div className="flex items-center justify-between px-3 py-1 bg-[#007acc] text-white text-[11px] font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 bg-[#16825d] px-1.5 py-0.2 rounded text-[10px]">
            <VscRemote /> WSL: Ubuntu
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
            <VscSourceControl /> main*
          </span>
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-200">
            <VscError /> 0 <VscWarning /> 0
          </span>
        </div>
        <div className="flex items-center gap-4 hidden sm:flex">
          <span className="cursor-pointer hover:text-gray-200">UTF-8</span>
          <span className="cursor-pointer hover:text-gray-200">TypeScript React</span>
          <span className="cursor-pointer hover:text-gray-200"><VscFeedback /></span>
          <span className="cursor-pointer hover:text-gray-200"><VscBell /></span>
        </div>
      </div>
  )
}

export default FooterToolbar