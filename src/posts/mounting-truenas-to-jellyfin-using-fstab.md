---
title: "Mounting TrueNAS to Jellyfin using fstab"
date: Mon, 27 May 2024 11:33:31 +0000
tags: ["homelab"]
---

This is another self-note that I am publishing in my journey of setting up a Home Lab. You can set up Jellyfin in TrueNAS itself, but given my proxmox setup, I have TrueNAS running in a VM and have LXC running Jellyfin...and I want them to talk.

#### Why/What?

We're going to mount a `pool` in TrueNAS within Jellyfin so you can put all your movies/shows in that `pool` and then have them show up in Jellyfin. For me, this allows me to backup my media but also have it all very accessible via my FireTV.

#### How?

#### On TrueNAS

The steps on TrueNAS is pretty simple:
  1. Create a user - I called mine `jellyfin` and set a password
  2. I gave that user access to the `pool` with all my media
  3. Done!

#### On the Jellyfin LXC

First you need to install `cifs-utils`:

```sh
apt install cifs-utils
```

And then create a file `/root/.smbcredentials` and put the credentials of the user you created:

```sh
username=jellyfin
password=xxxx
```

And then finally edit `/etc/fstab`:

```sh
//192.168.xxx.xxx/{pool-name} /media/ cifs credentials=/root/.smbcredentials,x-systemd.automount,uid=0,gid=0,iocharset=utf8,file_mode=0777,dir_mode=0777,vers=3.0 0 0
```

Make sure you point the IP address to your TrueNAS instance and you replace `{pool-name}` with the `pool` that contains your media.

Now run the following and your media files should be available at `/media/` in Jellyfin!

```sh
mount -a
```