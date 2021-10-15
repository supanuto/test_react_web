export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
  
    {
      title: true,
      name: 'GME',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'ChatBots',
      url: '/chatbot',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Line Member Users',
          url: '/chatbot/LineUsers',
          icon: 'icon-puzzle',
        },
        {
          name: 'User Register',
          url: '/chatbot/Registers',
          icon: 'icon-puzzle',
        },
        {
          name: 'User UnLock',
          url: '/chatbot/LineUserUnLocks',
          icon: 'icon-puzzle',
        },
        {
          name: 'Batch Log',
          url: '/chatbot/BatchLogs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Line User Details',
          url: '/chatbot/LineUserDetails',
          icon: 'icon-puzzle',
        },
        {
          name: 'Line User View',
          url: '/chatbot/LineUserDetailViews',
          icon: 'icon-puzzle',
        },

        // {
        //   name: 'Tables',
        //   url: '/base/tables',
        //   icon: 'icon-puzzle',
        // },
      ],
    },
    
  
  ],
};
