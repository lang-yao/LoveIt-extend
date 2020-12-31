---
title: 			"Links"
type:       links

links: 
  me: 
    name: Me 
    weight: 1
    people: 
      - name: YaoLang
        url: https://www.xiaodejiyi.com/
        avatar: https://www.gravatar.com/avatar/ae94c8d8ca3d56eb035a3e62c2595150?s=240&d=mp
        description: just do sth i should do.|
  friends: 
    name: Friends 
    weight: 2 
    people: 

---

This page can't have Markdown ## label.
Otherwise, you will get lots of error in chrome console.
Because, in templates, i only consider the links array. If you use ## label here, the directory array of page will overflow.
If you want to fix this problem, you might need see **TableOfContents** in [Table of Contents](https://gohugo.io/content-management/toc/). And then modify the table of tontents in `layouts\links\single.html`.
