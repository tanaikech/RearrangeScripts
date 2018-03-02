/**
 * Install
 */
function onInstall() {
  onOpen();
}

/**
 * Create menu
 */
function onOpen() {
  var ui = SpreadsheetApp
    .getUi()
    .createAddonMenu()
    .addItem('Rearrange scripts', 'opensidebar')
    .addItem('About', 'about')
    .addToUi();
}

function about() {
  var html = HtmlService.createHtmlOutputFromFile('about').setWidth(640).setHeight(480);
  SpreadsheetApp.getUi().showModalDialog(html, "About");
}

function opensidebar() {
  var sidebarUi = HtmlService.createHtmlOutputFromFile('index').setTitle('Rearranging Scripts in Project');
  SpreadsheetApp.getUi().showSidebar(sidebarUi);
}

/**
 * Main method for RearrangeScripts.<br>
 * @param {Object} Object Object
 * @return {Object} Return Object
 */
function doRearrangement(e) {
    var RS = new RearrangeScripts();
    if (e) {
        switch (e[0]) {
            case "getFiles":
                return RS.getFiles(e[1]);
            case "getProjectRaw":
                return RS.getProjectRaw(e[1]);
            case "reflectArrangeOW":
                return RS.reflectArrangeOW(e[1]);
            case "reflectArrangeCR":
                return RS.reflectArrangeCR(e[1]);
        }
    }
    return;
}

/**
 * Show alert.<br>
 * @param {String} String Alert message
 */
function showAlert(e) {
    new RearrangeScripts().showAlert(e);
}

/**
 * Show dialog.<br>
 * @param {String} String message
 */
function showDialog(e) {
    new RearrangeScripts().showDialog(e);
}

/**
 * Show alert and return value by selecting.<br>
 * @param {String} String Alert message
 * @return {Bool} Bool Returned value
 */
function showAlertReturn(e) {
    return new RearrangeScripts().showAlertReturn(e);
}
;
(function(r) {
  var RearrangeScripts;
  RearrangeScripts = (function() {
    var chkSwitchIssue;

    RearrangeScripts.name = "RearrangeScripts";

    function RearrangeScripts(a) {
      this.projectName = "";
      this.ui = SpreadsheetApp.getUi();
      this.switchUrl = "https://script.google.com/home/usersettings";
      this.swtchWarning = "<p>WARNING: Please turn on the switch for using Google Apps Script API at <a href=\"" + this.switchUrl + "\" target=_blank ><b>HERE!</b></a></p><input type=\"button\" onclick=\"google.script.host.close();\" value=\"ok\">";
    }

    RearrangeScripts.prototype.getProjectRaw = function(projectId_) {
      this.projectName = getProjectInfo(projectId_).title;
      if (this.projectName != null) {
        return [getProjectRaw(projectId_), this.projectName];
      } else {
        this.showAlert("No file of file ID : " + projectId_);
        return "Error";
      }
    };

    RearrangeScripts.prototype.updateProjectByRaw = function(projectId_, raw_) {
      return updateProjectByRaw(projectId_, raw_);
    };

    RearrangeScripts.prototype.getFiles = function(e) {
      var da, data, file, files, folder, folders, idn;
      data = {};
      idn = e;
      e = e === "root" ? DriveApp.getRootFolder().getId() : e;
      data[e] = {};
      data[e].keyname = idn === "root" ? "[root]" + DriveApp.getFolderById(e).getName() : DriveApp.getFolderById(e).getName();
      data[e].keyparent = idn === "root" ? null : (DriveApp.getFolderById(e).getParents().hasNext() ? DriveApp.getFolderById(e).getParents().next().getId() : null);
      data[e].files = [];
      da = idn === "root" ? DriveApp.getRootFolder() : DriveApp.getFolderById(e);
      folders = da.getFolders();
      files = da.getFiles();
      while (folders.hasNext()) {
        folder = folders.next();
        data[e].files.push({
          name: folder.getName(),
          id: folder.getId(),
          mimeType: "folder"
        });
      }
      while (files.hasNext()) {
        file = files.next();
        if (file.getMimeType() === "application/vnd.google-apps.script") {
          data[e].files.push({
            name: file.getName(),
            id: file.getId(),
            mimeType: file.getMimeType()
          });
        }
      }
      return data;
    };

    RearrangeScripts.prototype.reflectArrangeOW = function(e) {
      var dummy, f, h, i, j, len, project, ref;
      project = {};
      project.files = [];
      ref = e[0];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        h = ref[i];
        delete e[1].files[e[0][i]].id;
        project.files.push(e[1].files[e[0][i]]);
      }
      dummy = {
        files: [
          {
            name: "Dummy_" + (new Date()),
            source: "// This is a dummy.",
            type: "SERVER_JS"
          }, {
            name: "appsscript",
            source: "{}",
            type: "JSON"
          }
        ]
      };
      this.projectName = e[3];
      r = updateProjectByRaw(e[2], dummy);
      f = chkSwitchIssue.call(this, r);
      if (f) {
        return null;
      }
      updateProjectByRaw(e[2], project);
      return JSON.stringify(project);
    };

    RearrangeScripts.prototype.reflectArrangeCR = function(e) {
      var f, h, i, j, len, project, ref;
      project = {};
      project.files = [];
      ref = e[0];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        h = ref[i];
        delete e[1].files[e[0][i]].id;
        project.files.push(e[1].files[e[0][i]]);
      }
      this.projectName = e[3];
      r = createProjectByRaw(this.projectName + "_Rearranged", project);
      f = chkSwitchIssue.call(this, r);
      if (f) {
        return null;
      }
      return JSON.stringify(project);
    };

    RearrangeScripts.prototype.showDialog = function(e) {
      var html;
      html = HtmlService.createHtmlOutput(e).setHeight(120).setWidth(700);
      return this.ui.showModalDialog(html, 'WARNING');
    };

    RearrangeScripts.prototype.showAlert = function(e) {
      return this.ui.alert(e);
    };

    RearrangeScripts.prototype.showAlertReturn = function(e) {
      var res;
      res = this.ui.alert(e, this.ui.ButtonSet.YES_NO);
      if (res === this.ui.Button.YES) {
        return true;
      } else {
        return false;
      }
    };

    chkSwitchIssue = function(r) {
      if ("error" in r) {
        if (~r.error.message.indexOf(this.switchUrl)) {
          this.showDialog(this.swtchWarning);
          return true;
        } else {
          this.showDialog(JSON.stringify(r));
          return true;
        }
      }
    };

    return RearrangeScripts;

  })();
  return r.RearrangeScripts = RearrangeScripts;
})(this);
