// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-git-access-with-vpn-proxy",
        
          title: "Git access with VPN proxy",
        
        description: "A solution to inaccessibility of github in restricted regions including China",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/git-access-with-vpn-proxy/";
          
        },
      },{id: "post-understanding-diffusion-models",
        
          title: "Understanding Diffusion Models",
        
        description: "A mathematical explanation of diffusion models, their forward and reverse processes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/understanding-diffusion-models/";
          
        },
      },{id: "post-potential-solutions-when-encountering-the-nan-gradient-problem-with-pytorch",
        
          title: "Potential Solutions when encountering the nan gradient problem with pytorch",
        
        description: "A guide on troubleshooting and resolving NaN gradient issues in PyTorch deep learning models",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/grad-nan-solutions/";
          
        },
      },{id: "post-conda-environment-setup-diary",
        
          title: "Conda Environment Setup Diary",
        
        description: "A guide on setting up conda environments on a computing server for AI research",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/conda-setup-diary/";
          
        },
      },{id: "post-leetcode-904-fruit-into-baskets",
        
          title: "Leetcode 904: Fruit Into Baskets",
        
        description: "A solution to the Leetcode problem of finding the longest sub-string consisting of only two numbers",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/leetcode-904/";
          
        },
      },{id: "post-leetcode-1359-count-all-valid-pickup-and-delivery-options",
        
          title: "Leetcode 1359: Count All Valid Pickup and Delivery Options",
        
        description: "A solution to the Leetcode problem of counting valid pickup and delivery options using combinatorial mathematics",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/leetcode-1359/";
          
        },
      },{id: "post-commonly-used-git-commands",
        
          title: "Commonly Used Git Commands",
        
        description: "A reference guide for frequently used Git commands for everyday development workflows",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/git-commands/";
          
        },
      },{id: "post-leetcode-33-search-in-rotated-sorted-array",
        
          title: "Leetcode 33: Search in Rotated Sorted Array",
        
        description: "A solution to the Leetcode problem of searching in a rotated sorted array with O(log n) complexity",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/leetcode-33/";
          
        },
      },{id: "post-leetcode-142-linked-list-cycle-ii",
        
          title: "Leetcode 142: Linked List Cycle II",
        
        description: "A detailed solution to the Linked List Cycle II problem using Floyd&#39;s cycle-finding algorithm",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/leetcode-142/";
          
        },
      },{id: "post-leetcode-48-rotate-image",
        
          title: "Leetcode 48: Rotate Image",
        
        description: "A solution to the Leetcode problem of rotating an n x n 2D matrix by 90 degrees clockwise",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/leetcode-48/";
          
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/zyinghua", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/yinghuazh", "_blank");
        },
      },{
        id: 'social-leetcode',
        title: 'LeetCode',
        section: 'Socials',
        handler: () => {
          window.open("https://leetcode.com/u/nbpppp/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },];
