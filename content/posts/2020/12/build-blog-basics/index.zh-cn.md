---
title: 			"使用Hugo框架搭建博客的过程 - 前期部署"
subtitle:		"学习Hugo，并给网站添加丰富的功能"
date: 			2020-12-28T11:48:34+08:00
lastmod: 		2020-12-28T11:48:34+08:00

draft: 		  	false
lightgallery:   true

tags:			["Hugo"]
categories:		["博客历程"]
memories:       ["自媒体"]

description:	"使用Hugo框架搭建博客的详细过程"
Keywords:		["Hugo", "博客"]

---

## 前言

读完本文，可搭建这样[效果](https://hugoloveit.com/zh-cn/)的博客。

![demonstration](D:\src\code\blog\content\posts\2020\12\build-blog-basics\demonstration.png)

### 所需步骤

可以从这样的角度出发：

1. 为了方便访问网站，需要注册域名。
2. 加快网站加载速度，使用CDN。
3. 网站内容需要部署在服务器或对象存储平台上。
4. 重要的是放什么内容。博客需要选择框架，或自己开发。
5. 框架确定后，选择主题，或自己开发。
6. 配置主题。
7. Hello World！

## 博客框架

1. 框架选择
    1. Wordpress
        * 缺点：不安全。
        * 主题推荐：[Sakura](https://2heng.xin/)
    1. Hexo
        * 主题推荐：[matery](https://github.com/blinkfox/hexo-theme-matery/)
        * 渲染生成文章速度不如Hugo。
    1. Hugo
3. 结论
    1. 选择**Hugo**框架。
    1. 用Markdown写文章，方便以后迁移。
    1. 静态博客方便备份。
    1. 缺点，使用对象存储服务需要支付流量费，存在被DDOS的风险。
4. 下载
    1. Hugo 
    1. Hugo extend
        * 支持**Sass/SCSS**
    1. [下载地址](https://github.com/gohugoio/hugo/releases)
    1. Windows可考虑使用scoop下载
## 博客部署
### 对象存储平台和服务器 
1. 对象存储平台  
    国内有阿里云OSS、腾讯COS、又拍云、七牛云等。国外有Github Pages、Netlify、Azure、Google等，其中Github Pages免费，但是屏蔽百度爬虫，影响SEO。
    
    对象存储平台也可以做为Markdown图床，配合CDN，加快图片加载速度。
    
    服务器用的是阿里家的，所以对象存储也用了阿里云OSS。
    
    >阿里云OSS部署参考  
    >* [Hugo 静态网站部署及免费 HTTPS 证书配置](https://mrhelloworld.com/hugo-oss-install)
    >* [OSS常用工具汇总](https://help.aliyun.com/document_detail/44075.html?spm=a2c4g.11186623.6.845.7a8b2b69fp6EnL) 
    
    对象存储的配置是非常简单的，参考以上文章可以进行上传操作。注册域名后，配置上传的Bucket为**公共读**权限可通过域名访问上传的资源，同时限制**Refer**，做好防盗链。
    
2. 服务器  
    平时有使用VPS需求，可选择使用VPS。

3. 对比  
    1. 对象存储：  
        * 优点：便宜，不需要搭建环境。  
        * 缺点：流量费用，要考虑图床的防盗链。  
    1. 服务器：  
        * 优点各种踩坑😔，可以提升技能。   
    1. 费用：  
        * 对象存储平台不考虑流量费：7.2元/年。  
        * 阿里云服务器，学生党及年龄小于等于24岁：10元/月；不满足以上条件的个人：121元/月。  
    1. 结论
        - 对象存储上手简单，成本低。
### 服务器环境  
不使用服务器部署网站可跳过。

1. 操作系统Ubuntu  

1. SSH安全配置  
    * 安全组限制IP通过SSH远程登陆。如果使用**Github Action**安全组无法限制，Github Action的服务器部署在Azure上，官方文档中包含几万行IP段，不适合做限制。
    * [修改22端口](https://www.laozuo.org/16533.html)。由于第一个原因，只能修改端口。否则**Massscan**3分钟全网段扫描，触发SSH口令暴力破解，几乎每天都有告警。注意！修改之后，确定其他端口可以登陆再关闭22端口。
    * [配置SSH key](https://blog.csdn.net/u013778905/article/details/83501204)避免执行***\*git\****命令时用户密码验证。
    
1. 更新安装源
    
    * apt update  
    
1. 修改hostname  
    ```bash
    hostnamectl --static set-hostname localhost  
    重启  
    ```

1. 软件安装  
    ```bash
    apt install git  
    apt install nginx   
    ```

1. Nginx配置
    * root权限启动  
        避免前端访问403的问题。`/etc/nginx/nginx.conf`中启动配置的用户与实际启动nginx的用户需要保持一致，可修改为低权限用户启动。
        
如果Nginx版本存在漏洞，以root权限启动，存在被拿到root权限的风险。  
        
    * 配置 `/etc/nginx/nginx.conf`
    ```
    ...
    include /etc/nginx/conf.d/*.conf;
    # 注释下面这行。如果sites-enabled/路径下存在默认配置文件，可能覆盖/etc/nginx/conf.d/default.conf配置
    # include /etc/nginx/sites-enabled/*;
    ...
    ```
    * 配置 `/etc/nginx/conf.d/default.conf`配置
    ```
    server { 
        listen 80; 
        server_name www.xiaodejiyi.com xiaodejiyi.com; # 注意www和没有www都要配置
        index index.html index.htm; 
        root /var/www/html/public; 
        
        location / { 
            root /var/www/html/public; 
            index index.html; 
        } 
        error_page 404 /404.html; 
    }
    ```

### 注册域名  
[万网注册](https://wanwang.aliyun.com/)域名
配置DNS解析，域名邮箱解析等可能存在冲突。  

>参考[DNS解析冲突规则](https://help.aliyun.com/knowledge_detail/39787.html?spm=5176.11065259.1996646101.searchclickresult.25a51f3bEwgm0S)



### 备案
* IPC备案  
* 公安备案  
>香港，国外的服务器不需要备案。  
### HTTPS证书
使用HTTPS证书避免HTTP劫持风险，劫持https请求需要伪造证书。
阿里云可申请免费HTTPS证书，但是一个子域名需要单独申请一个证书。  

**Chrome浏览器HTTP网站显示“不安全”，是怎么回事?**

>谷歌从Chrome 56版本浏览器开始对使用HTTP协议传输密码信息的网站进行“不安全”警告；而2018年7月，谷歌Chrome 68将对所有HTTP网站显示“不安全”警告。随着Chrome浏览器的版本升级，会有越来越多的用户看到HTTP网站的“不安全”警告。来源：https://www.sohu.com/a/242732942_188485

### CDN
购买CDN资源包，加速域名访问。静态博客不需要购买动态请求次数。
* 通过jsdelivr加速网站资源。
    参考[使用 jsDelivr 免费加速 GitHub Pages 博客的静态资源](https://zhuanlan.zhihu.com/p/137795279)

以上步骤完成后，将域名解析到CDN，CDN加速源站或对象存储服务。访问域名，确定CDN是否加速。

1. 通过ping命令查看IP是否为CDN的IP。
2. 打开Chrome控制台，查看返回包头是否有`X-Cache`字段。

## Hugo主题
### LoveIt主题  
功能很全面的一个主题，支持很多功能，节省了在不少功能上自己折腾的时间。[LoveIt主题介绍](https://hugoloveit.com/zh-cn/about/)

安装主题
1. 不修改主题
    添加子模块
    `git submodule add https://github.com/dillonzq/LoveIt.git themes/LoveIt`
    
    >可设置Dependabot自动合并主题更新  
    >* [About Dependabot version updates](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/about-dependabot-version-updates)  
    >* [Automate Theme Update](https://toha-guides.netlify.app/posts/getting-started/theme-update/#setup-dependabot)  
1. Fork主题后进行修改
    1. fork主题到自己的仓库。
    1. 添加子模块：
        `git submodule add <自己仓库的url> <path>`
    1. 设置上游进行同步，在主题目录中执行
        `git remote add upstream <上游主题的url>`
    1. fork后，添加的submodule是自己的仓库。使用Dependabot需要手动和上游同步之后，才会触发blog仓库更新检查。所以不适用Dependabot。
                
### toha主题  
一个非常适合做个人简历的[主题](https://themes.gohugo.io/theme/toha/)。
        
## 同步文章到服务器
同步到对象存储，参考[Hugo 静态网站部署及免费 HTTPS 证书配置](https://mrhelloworld.com/hugo-oss-install)和[OSS常用工具汇总](https://help.aliyun.com/document_detail/44075.html?spm=a2c4g.11186623.6.845.7a8b2b69fp6EnL)。

文章同步到服务器，需要使用脚本，简化文章上传的过程。

1. 本地创建博客文章
2. 配置SSH免密登陆
3. 使用Python脚本生成网站静态资源，提交变更
4. Github Action使用rsync同步网站静态资源到服务器，使用[atomic-algolia](https://github.com/chrisdmacrae/atomic-algolia)同步`index.json`到Algolia。

### SSH免密登陆
注意！服务器端要配置authorized_keys。参考[设置 SSH 通过密钥登录](https://www.runoob.com/w3cnote/set-ssh-login-key.html)   

### 注册Algolia
使用Algolia搜索引擎为博客提供搜索功能。参考[搜索配置](https://hugoloveit.com/zh-cn/theme-documentation-basics/#52-%E6%90%9C%E7%B4%A2%E9%85%8D%E7%BD%AE)

### Github Action

blog/文件根目录下创建`package.json`文件，并在scripts模块中加入`"algolia": "atomic-algolia"`。  

```json
{
  "name": "algolia",
  "version": "0.2.0",
  "description": "atomic-algolia package",
  "private": true,
  "scripts": {
    "algolia": "atomic-algolia"
  }
}

```
在Github的`Blog`仓库中添加`Secrets`变量  
同步`index.json`到Algolia需要配置如下变量：

* ALGOLIA_ADMIN_KEY  
* ALGOLIA_APP_ID  
* ALGOLIA_INDEX_NAME  

**rsync**同步需要配置如下变量

* HOST  
* PORT
* USER
* REMOTE_PATH  
    Nginx中配置的网站根目录  
* SSH_KEY

使用Github Action，创建workflow，复制以下代码。
```yml
name: deploy_blog

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Check Out
        uses: actions/checkout@v2

      #同步blog搜索
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Install automic-algolia
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_ADMIN_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}
          ALGOLIA_INDEX_NAME: ${{ secrets.ALGOLIA_INDEX_NAME }}
          ALGOLIA_INDEX_FILE: "./public/index.json"
        run: | 
          npm install atomic-algolia
          npm run algolia

      - name: deploy to server
        uses: AEnterprise/rsync-deploy@v1.0
        env:
          DEPLOY_KEY: ${{ secrets.SSH_KEY }}
          # avzr参数，增量备份本地文件。-delete 删除目标地址中本地没有的文件
          ARGS: "-avzr --delete"
          SERVER_PORT: ${{ secrets.PORT }}
          FOLDER: "./public/"
          SERVER_IP: ${{ secrets.HOST }}
          USERNAME: ${{ secrets.USER }}
          SERVER_DESTINATION: ${{ secrets.REMOTE_PATH }}
```
出问题可以先在本地创建linux虚拟机，测试`rsync命令`能否正常使用，确定服务器同步是否正常。
## 本地备份脚本
在博客目录下执行该脚本，先推送blog到Github的`blog`仓库，再本地备份。
```Python
import time
import os, sys

def main(msg):
	# 备份blog/
	print("*"*10+"push blog/"+"*"*10, end="\n\n")
	# 生成静态页面
	os.system('hugo')

	os.system('git add .')
	os.system('git commit -m "{}"'.format(msg))
	os.system('git push')

    local_back = input('\n本地备份？提示: y\n')
    if local_back == 'y':
        os.system(r'7z a D:\src\xxxxx.rar D:\src\xxxxx')
        os.system(r'move D:\src\code\xxxxx.rar D:\backup\xxxxx')
        print('本地备份完成！')

    print('over...')

if __name__ == '__main__':
    msg = input('commit: ')
    main(msg)
```

## LoveIt主题配置

使用服务器搭建步骤相对对象存储更多一些，然而以前后端来说的话，后端刚部署完成。硬件准备妥当以后，开始前端的相关操作。可参考LoveIt作者写的[文章](https://hugoloveit.com/zh-cn/theme-documentation-basics/)，对照`\themes\LoveIt\exampleSite\config.toml`文件，熟悉主题的配置。

* 搜索配置
  * 使用algolia作为搜索引擎
* 社交信息设置
* 评论系统设置
  * 配置[Valine评论系统](https://valine.js.org/)
* 第三方库配置
  * 使用jsdeliver加速第三方库文件的加载
* 站长工具，网站验证代码
  * 提交搜索引擎，收录网站文章
* Google网站分析配置
  * 网站流量分析

完成以上功能配置后，可满足一般博客使用需求。如果要拓展主题功能，像[分类](https://www.xiaodejiyi.com/memories/)，[列表页面](https://www.xiaodejiyi.com/websites/)，需要学习Hugo语法。

## 参考

* [LoveIt主题文档](https://hugoloveit.com/zh-cn/theme-documentation-basics/)
* [Hugo官方文档](https://gohugo.io/getting-started/)