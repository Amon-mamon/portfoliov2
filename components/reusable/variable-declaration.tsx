import React from 'react';
import { HiOutlineEquals } from "react-icons/hi2";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface VariableTypes {
  keyword?: 'const' | 'let' | 'var';
  variableName: string;
  tagName?: string;
  tagId?: string;
  exportDefault?: boolean;
  children: React.ReactNode;
}

const VariableDeclaration: React.FC<VariableTypes> = ({
  keyword = 'const',
  variableName,
  tagName = 'section',
  tagId,
  exportDefault = true,
  children,
}) => {
  return (
    <div className="pb-12 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono">
      
      {/* Component Signature / Variable Declaration */}
      <div className="flex items-center">
        <div className="flex items-center gap-1 py-2">
          <span className="text-[#c586c0]">{keyword}</span>{" "}
          <span className="text-[#dcdcaa] font-bold">{variableName}</span>{" "}
          <span className="text-[#d4d4d4]"><HiOutlineEquals /></span>{" "}
          <span className="text-[#d4d4d4]">( )</span>{" "}
          <span className="text-[#c586c0] flex items-center gap-1">
            <HiOutlineEquals /> <MdKeyboardDoubleArrowRight className="text-lg" />
          </span>{" "}
          &#123;
        </div>
      </div>

      {/* Return Opening */}
      <div className="flex items-center pt-3">
        <div className="pl-4 sm:pl-8">
          <span className="text-[#c586c0]">return</span> (
        </div>
      </div>

      {/* JSX Open Tag */}
      <div className="flex items-center">
        <div className="pl-8 sm:pl-16 pt-2">
          &lt;<span className="text-[#569cd6]">{tagName}</span>
          {tagId && (
            <>
              {" "}<span className="text-[#9cdcfe]">id</span>=
              <span className="text-[#ce9178]">&quot;{tagId}&quot;</span>
            </>
          )}
          &gt;
        </div>
      </div>

      {/* Rendered Content / Children */}
      {children}

      {/* JSX Close Tag */}
      <div className="pl-8 sm:pl-16">
        &lt;/<span className="text-[#569cd6]">{tagName}</span>&gt;
      </div>

      {/* Return Close & Function Close */}
      <div className="pl-4 sm:pl-8">);</div>
      <div>&#125;;</div>

      {/* Export Statement */}
      {exportDefault && (
        <div className="flex items-center pt-2">
          <div>
            <span className="text-[#c586c0]">export default</span>{" "}
            <span className="text-[#dcdcaa]">{variableName}</span>;
          </div>
        </div>
      )}

    </div>
  );
};

export default VariableDeclaration;