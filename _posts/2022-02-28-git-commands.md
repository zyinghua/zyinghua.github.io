---
layout: post
title: "Commonly Used Git Commands"
date: 2022-02-28
description: A reference guide for frequently used Git commands for everyday development workflows
tags: git version-control development reference
categories: git tools
---

### Login & Pull

Set your git user email for every repository on your computer

> `$ git config --global user.email "xxx@email.com"`

Set your git username for every repository on your computer

> `$ git config --global user.name "zyinghua"`

Clone from github/gitlab, etc...:

> `$ git clone https://github.com/zyinghua/...`

Pull from the repository cloned while staying in that clone (which contains .git):

> `$ git pull`

---

### Commit & Push

1. Check Status (between the platform and the local repo):

    > `$ git status`

2. Add a newly affected file:

    > `$ git add newFile.txt`

3. Add ALL newly affected files:

    > `$ git add .`

4. Commit the changes:

    > `$ git commit -m "Comment message goes here..."`

5. Push the changes:
    > `$ git push`

---

### Branch & Merge

To check all the branches:

> `$ git branch -a`

To add a new branch:

> `$ git branch branchname`

Or optionally choose a specific branch as a default:

> `$ git branch branchname branchname-copy-from`

To change to a specific branch:

> `$ git checkout branchname`

To specify remote ref for current branch;

> `$ git push --set-upstream origin my-main`

Once commited in a non-main branch, the changes will not be visible to the other branches! Until the merge.

To create a new empty file:

> `$ touch filename.html (or txt, etc...)`

To edit the file in git bash:

> `$ nano filename.html`

To show differences between the current branch and the other one:

> `$ git diff otherbranchname (e.g. main)`

To merge branches:

> Switch to the main branch ($ git checkout main), and then:
> `$ git merge branchname`

### Revert
Sometimes you would want to revert to a previous commit. To do so, first check the commit history
and obtain the commit ID (e.g., a6b1234), then:

> `$ git reset --hard <commit_id>`
> 
> `$ git push --force`
