import VariableDeclaration from '@/components/reusable/variable-declaration'
import UnderDevelopment from '@/components/under-development'
import React from 'react'

const page = () => {
  return (
   <div className='overflow-hidden h-full text-white select-none p-4 md:p-8'>
      <VariableDeclaration 
      variableName="ActivtyLog" tagName="section" tagId="activity-log"      
      >
            <UnderDevelopment
            title="Under Development"
            message="User settings & preferences are currently being compiled"
            fileName="activity-log.tsx"
            statusBadge="COMING_SOON"
            progressValue={52}
            customLogs={[
              "Developing Activity Logs...",
              "Developing Activity Logs...",
              "Developing Activity Logs..."
            ]}
            />
      </VariableDeclaration>
   </div>
  )
}

export default page