import React from 'react';
import Image from 'next/image';
const timelineData = [
  {
    date: '1 Aug, 2023',
    items: [
      {
        avatar: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80',
        title: 'Created "Preline in React" task',
        description: 'Find more detailed instructions here.',
        buttonLabel: 'James Collins',
        buttonAvatar: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      },
      {
        avatar: '',
        title: 'Release v5.2.0 quick bug fix 🐞',
        description: '',
        buttonLabel: 'Alex Gregarov',
        buttonAvatar: ''
      },
      {
        avatar: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80',
        title: 'Marked "Install Charts" completed',
        description: 'Finally! You can check it out here.',
        buttonLabel: 'James Collins',
        buttonAvatar: 'https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
      }
    ]
  },
  {
    date: '31 Jul, 2023',
    items: [
      {
        avatar: '',
        title: 'Take a break ⛳️',
        description: 'Just chill for now... 😉',
        buttonLabel: '',
        buttonAvatar: ''
      }
    ]
  }
];

const TimelineItem = ({ avatar, title, description, buttonLabel, buttonAvatar }) => (
  <div className="flex gap-x-3">
    <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
      <div className="relative z-10 size-7 flex justify-center items-center">
        {avatar ? (
          <Image
            className="shrink-0 size-7 rounded-full"
            src={avatar}
            alt="Avatar"
            width={32} 
            height={32}
          />
        ) : (
          <span className="flex shrink-0 justify-center items-center size-7 border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            {title.charAt(0)}
          </span>
        )}
      </div>
    </div>
    <div className="grow pt-0.5 pb-8">
      <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          {description}
        </p>
      )}
      {buttonLabel && (
        <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          {buttonAvatar && (
            <Image
              className="shrink-0 size-4 rounded-full"
              src={buttonAvatar}
              alt="Button Avatar"
              width={16} 
              height={16} 
            />
          )}
          {buttonLabel}
        </button>
      )}
    </div>
  </div>
);

const Timeline = () => (
  <div>
    {timelineData.map(({ date, items }, index) => (
      <div key={index}>
        <div className="ps-2 my-2 first:mt-0">
          <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-neutral-400">
            {date}
          </h3>
        </div>
        {items.map((item, itemIndex) => (
          <TimelineItem key={itemIndex} {...item} />
        ))}
      </div>
    ))}
  </div>
);

export default Timeline;
