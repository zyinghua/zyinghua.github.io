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

### Local Soft Revert
You have done git commit, but want to revert back to AFTER git add (keep staged):
> `git reset --soft HEAD~1`

You have done git commit, but want to revert back to BEFORE git add (keep unstaged):
> `git reset --mixed HEAD~1`

You have made some changes to a file without git commit, but want to revert back to last commit (BEFORE current changes):
> `git checkout HEAD -- path/to/file`

### Revert Partial Changes in the differences between base and changed branches (with PR reflection)
Sometimes when you make a PR, and you are asked to keep only some partial changes (i.e., remove some
intermediate commits between the commit chain), you may do this:

1. Firstly, if you are referring to a remote branch, and you don't have a main branch that keeps up-to-date
with the remote main branch, then do (Otherwise please proceed to next):
> `git remote add upstream https://github.com/<original-owner>/<original-repo>.git`
> `git fetch upstream`

2. Make sure you are in your branch with changes:
> `git checkout <branch-name-with-changes>`

3. Rebase the branch (You may call origin/main if you skipped step 1):
> `git rebase -i upstream/main`

4. Now you should be in a state of file editing, by default you are in Vim (default editor for Git rebase) most likely,
then to delete commits, simply use up/down arrows to switch to the lines of commits you wanna delete and do `dd`. After that,
go to the bottom and type `:wq`, which means save write and quit. Now the edits are completed and only partial commits are kept.

5. To push to remote safely and reflect on the PR:
> `git push --force-with-lease origin <branch-name-with-changes>`

6. All set!