"use client";
import React, { useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



import { useInboxNotifications, useUpdateRoomNotificationSettings } from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";

import { useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense";

function NotificationBox({ children }) {
  const { inboxNotifications } = useInboxNotifications();
  const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();
  const { count, error, isLoading } = useUnreadInboxNotificationsCount();

  useEffect(() => {
    updateRoomNotificationSettings({ threads: 'all' })
  }, [count])
  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex gap-1'>
          {children} <span className='bg-primary rounded-full text-[7px] text-white p-1 px-2 -ml-3'>{count}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className={'w-[400px]'}>
        <InboxNotificationList>
          {inboxNotifications.map((inboxNotification) => (
            <InboxNotification
              key={inboxNotification.id}
              inboxNotification={inboxNotification}
            />
          ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>

  )
}

export default NotificationBox