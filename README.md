RearrangeScripts
=====

<a name="TOP"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="Overview"></a>
# Overview
This is an **add-on** GAS application for rearranging Google Apps Scripts (GAS) in a project which can be seen at the script editor.

# Demo
![](images/demo.gif)

<a name="Description"></a>
# Description
Have you ever thought about rearranging Google Apps Scripts in a project which can be seen at the script editor? I also have thought about it. Finally, I could find the workaround to do it. And recently, I have given this function to [ggsrun](https://github.com/tanaikech/ggsrun/blob/master/help/README.md#rearrangescripts) which is a CLI tool. Furthermore, I thought that if there is a GUI application for rearranging scripts in a project, it may be useful for more users. So I created this. Today, I published this as a GUI tool using Google Apps Script. If this was useful for you, I'm glad.

The flow of rearrangement of files in a project using this application is as follows.

1. Read a Google Apps Script project that you selected from your Google Drive by select box and text box. In the select box, users can select a project file. In the text box, users can directly input the file ID of project.
2. When the project is selected, the files in the project are displayed on the side bar.
3. The displayed files can be rearranged by user's mouse.
4. When the rearrangement was completed, users can saved the project with the rearranged files.
    - When the rearranged project is saved, users can select overwrite or create as new project on user's Google Drive.

The projects of the standalone script type and the container-bound script type can be used.

**[At December 20th, 2017, this was published as an add-on application.](https://chrome.google.com/webstore/detail/rearrangescripts/ndaicidjkbcpajgejcclgfdcncpoekml?utm_source=permalink)**

# How to install
1. Create new spreadsheet.
1. Click "Add-ons" at menu bar.
1. Select "Get add-ons".
1. Input "rearrangescripts" in "Search add-ons".
1. Install rearrangescripts.

> **IMPORTANT!!**
>
> Please confirm this page [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings) If the switch is turned off, please turn on. By this, Google Apps Script API can be used. When the switch is turned off, even if the scopes of Google Apps Script API are authorized, users cannot use the APIs.

# Usage
Please see the above demonstration movie.

### Post-install tip
1. After installation, click Add-ons -> RearrangeScripts -> Rearrange scripts
2. By this, add-on is launched at sidebar, users can see "Select project".
3. At "Select project", users select a standalone project by clicking the triangle of right side. The list is displayed only standalone projects.
4. If you want to rearrange projects of bound script type, you can do it by inputting file ID of the project to text box, and click "ok".
5. When users select one of project or input file ID, "Rearrange scripts" and scripts in the selected project are shown. The scripts are shown at gray color zone.
6. Users can rearrange and reorder each scripts using own mouse.
7. When the rearrangement is done, the project can be saved by clicking "Save!" button. At that time, users can select the save method. When "Overwrite to project" is selected, the rearranged scripts are overwritten to the selected project. When "Create as new project" is selected, the rearranged scripts are saved as a new project. The new project is created to root folder.
8. When users click filename of the project, the project is opened.

### IMPORTANT!
> 1. For rearranging scripts, there is one important point. When scripts in a project is rearranged, version history of scripts is reset once. So if you don't want to reset the version history, please push "Save!" with "Create as new project". By saving with "Create as new project", new project with the rearranged scripts will be created to root folder on your Google Drive. When you click "Overwrite to project", the rearranged scripts will be reflected to the selected project.
> 2. About appsscript.json, this file got to be displayed to the top of files at script editor by recent updated. But the order of files in the project can be changed by this add-on. So appsscript.json is included in the file list.

# Principle of rearranging
1. Download all scripts in a project.
1. Overwrite the project by one script with the filename which is difference from the filenames of downloaded scripts.
1. Rearrange the downloaded scripts.
1. Overwrite the project by the rearranged scripts. At this time, remove the script ID of each script.

When existing project is overwritten by a script with an unique filename, all scripts in the project are removed and only the file with the unique name is remained. I thought that this can be applied for rearranging scripts.

For operating project, you can use [ProjectApp2](https://github.com/tanaikech/ProjectApp2). This application also uses ProjectApp2.

If you want to rearrange scripts on your terminal, you can use it using [ggsrun](https://github.com/tanaikech/ggsrun/blob/master/help/README.md#rearrangescripts).

-----

# Acknowledgements
- Jarrod Rapson

# [Privacy Policy](https://tanaikebox.github.io/2017/12/13/privacy-policy/)

<a name="Licence"></a>
# Licence
[MIT](LICENCE)

<a name="Author"></a>
# Author
[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="Update_History"></a>
# Update History
* v1.0.0 (November 13, 2017)

    Initial release.

* v1.0.1 (November 23, 2017)

    - Modified README.md
        - It reported that scopes used at this library can automatically install.
        - The detail information about this can be seen at [here](https://gist.github.com/tanaikech/23ddf599a4155b66f1029978bba8153b).

* v2.0.0 (December 20, 2017)

    - [RearrangeScripts was published as an add-on application.](https://chrome.google.com/webstore/detail/rearrangescripts/ndaicidjkbcpajgejcclgfdcncpoekml?utm_source=permalink)

* v2.0.1 (December 28, 2017)

    - Added "About" to the menu of add-on.

* v2.1.0 (February 3, 2018)

    - From this version, it got to be able to use the projects of both standalone script type and container-bound script type.


[TOP](#TOP)
