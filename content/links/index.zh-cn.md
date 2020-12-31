---
title: 			"友情链接"
type:       links

links: 
  me: 
    name: 我 
    weight: 1
    people: 
      - name: 朤尧
        url: https://www.xiaodejiyi.com/
        avatar: https://www.gravatar.com/avatar/ae94c8d8ca3d56eb035a3e62c2595150?s=240&d=mp
        description: just do sth i should do.
  friends: 
    name: 朋友 
    weight: 2 
    people: 

---
这个地方不能使用Markdown的标题标签或h1,h2...标签，否则前端目录代码会报错。
原因：
links数组与文档内容分为两个部分，模板代码中，我只考虑了links数组，未考虑文中的h标签。生成的目录应只有links数组的标题，如果文章中出现标题，结果是：正常渲染，页面目录数组溢出。
如果你准备修复这个问题，可以参考：[Table of Contents](https://gohugo.io/content-management/toc/)。然后修改`layouts\links\single.html`模板文件中的目录代码。
