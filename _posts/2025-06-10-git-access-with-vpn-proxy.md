---
layout: post
title: "Git access with VPN proxy"
date: 2025-06-10
description: A solution to inaccessibility of github in restricted regions including China
tags: git git-config proxy vpn china-git-solution
categories: solutions git
---

### Background:
Github operations like clone, pull, push are sometimes restricted in regions including China, posting significant inconvinience. This post shares a solution to this problem, assuming you have an access to a VPN in your region, and you are using a Windows system (Mac users may refer to a similar set of steps with slightly different commands).

---

### Solution:

<br>

#### Step <1>
We need to find the socks5 proxy of the VPN. We can firstly check the relevant connections via `netstat -ano | findstr LISTENING` in cmd, then scroll down to find the TCP connections with port (2nd column) formulated as `127.0.0.1:<port no.>`.

#### Step <2>
Then, check the applications using the connection PID (4th column) via `tasklist /FI "PID eq <PID>"`, if it shows the name of your VPN, then it is the one.

#### Step <3>
You may have multiple ports associated with the same PID, we need to find which one is the socks5 proxy port to use. We can do so by verifying the port via `curl --proxy socks5h://127.0.0.1:<port no.> https://www.google.com`. If it returns a html string, then it is the one. Otherwise, it may return errors or just stuck.

#### Step <4>
Now, use the port no. in command line as:

```
git config --global http.proxy "socks5h://127.0.0.1:<port no.>"
git config --global https.proxy "socks5h://127.0.0.1:<port no.>"
```

Hopefully it solves your git issues!