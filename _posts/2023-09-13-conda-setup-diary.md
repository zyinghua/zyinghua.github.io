---
layout: post
title: "Conda Environment Setup Diary"
date: 2023-09-13
description: A guide on setting up conda environments on a computing server for AI research
tags: conda computing-server research-experiments
categories: tutorials
---

#### This is the general steps on top of my head, that I followed to set up the conda environment on a computing server for a new user account, which might be commonly encountered when doing AI research.

---

1. Log onto the server via SSH:
    ```bash
    ssh <username>@<server-ip> -p <port>
    ```
   Make sure you activate the VPN if necessary. You will then be prompted to enter the password for the user account.


2. Once logged in, you will need to set up for environments, in AI research, typically we use conda. Make sure to download the latest version of miniconda from the official website, and install it on the server. At this time, the command to download the latest miniconda is:
    ```bash
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
    ```
    Once downloaded, run the script as:
    ```bash
    chmod +x Miniconda3-latest-Linux-x86_64.sh
    ./Miniconda3-latest-Linux-x86_64.sh
    ```
   Once you run the installer, you will be presented with a series of prompts. It's generally safe to accept the defaults. When asked if you'd like to prepend the Miniconda3 install location to PATH in your ~/.bashrc, you can opt to say 'yes'. This ensures that you can activate Conda from any new terminal. 


3.  Close and reopen your terminal or use the command to reload the profile:
    ```bash
    conda init bash
    ```
    ```bash
    source ~/.bashrc
    ```


4. Once conda is installed, you can create a new environment for your project, by running:
   ```bash
   conda create -n <env-name> python=<python-version> tensorflow=<tensorflow-version>
   ```
   The python and tensorflow version specification are optional, when specified, the environment will be created with the specified python and tensorflow version.

   Or if you have a environment.yaml file in the repo, you can do:
    ```bash
   conda env create -f environment.yaml
   ```
   which takes care of the installation of all necessary packages.

5. you can then activate the environment by running:
   ```bash
   conda activate <env-name>
   ```
   And deactivate it by running:
   ```bash
    conda deactivate
    ```

#### <strong>Note:</strong> You may need to run ```source ~/.bashrc``` at the time you enter the server, to make sure the conda command is available.

---

### Some useful commands:
1. Install package via conda:

    > `~$ conda install <package-name>=<package-version:optional>`
   
    To uninstall:

    > `~$ conda uninstall <package-name>`

2. Install package via pip:

    > `~$ pip install <package-name>=<package-version:optional>`

3. Check a specific package installed:

    > `~$ conda list <package-name>`

4. Check all conda env created:

    > `~$ conda env list`

5. Remove a conda env:

    > `~$ conda env remove -n <env-name>`

6. Check current GPU status on the server:

    > `~$ nvidia-smi`

   OR check live gpu status:

   > `gpustat -i`

7. Open up a sub-window system:
   
   > `tmux`

   within tmux:
   
   - Create a new window:
   
     > `Ctrl + b` then `c`
   
   - Switch to the next window:
   
     > `Ctrl + b` then `n`
   
   - Switch to the previous window:
   
     > `Ctrl + b` then `p`

   - Detach from the current window:
    
     > `Ctrl + b` then `d`
   
   - Delete the current window:
   
     > `exit`

   - Scroll within a tmux window:
     > `Ctrl + b` then `[`

   Outside tmux:
   
   - Check all the windows:
   
     > `tmux ls`
   
   - Attach to a specific window:
   
     > `tmux attach -t <window-name>`

8. Run a python script using specific GPU:

    > `CUDA_VISIBLE_DEVICES=<gpu-id1>,<gpu-id2>,... python <script-name>.py`

9. If you ever need to kill a process, you can use the command:

    > `kill -9 <process-id>`

    Process ID can be found by calling `nvidia-smi`.

10. To upload a file from local to the server:

    > `scp -P <port> <local-file-path> <username>@<server-ip>:<server-file-path>`

    e.g.:

    > `scp -P 22 /Users/username/Desktop/test.txt username@server-ip:~/home/username/test.txt`

11. Download Huggingface parquet dataset:

    > apt-get update

    > apt-get install git-lfs

    > git lfs install

    > git clone \<hugginface repo link\>

    This will download the actual data instead of the light parquet files. You can then decode the files to the original data.
