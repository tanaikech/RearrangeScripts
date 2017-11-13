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
            case "reflectArrange":
                return RS.reflectArrange(e[1]);
        }
    } else {
        return RS.rearrangementScripts();
    }
    return;
}
;
(function(r) {
  var RearrangeScripts;
  RearrangeScripts = (function() {
    var getui;

    RearrangeScripts.name = "RearrangeScripts";

    function RearrangeScripts(a) {
      // ProjectApp is used as a library. "https://github.com/tanaikech/ProjectApp";
      this.pa = ProjectApp.init();
      this.projectName = "";
    }

    RearrangeScripts.prototype.getProjectRaw = function(projectId_) {
      this.projectName = DriveApp.getFileById(projectId_).getName();
      return [this.pa.getProjectRaw(projectId_), this.projectName];
    };

    RearrangeScripts.prototype.rearrangementScripts = function() {
      var sidebarUi;
      sidebarUi = HtmlService.createHtmlOutputFromFile('index').setTitle('Rearranging Scripts in Project');
      (getui.call(this)).showSidebar(sidebarUi);
    };

    RearrangeScripts.prototype.updateProjectByRaw = function(projectId_, raw_) {
      return this.pa.updateProjectByRaw(projectId_, raw_);
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

    RearrangeScripts.prototype.reflectArrange = function(e) {
      var dummy, h, i, j, len, project, ref;
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
            type: "server_js"
          }
        ]
      };
      this.projectName = e[3];
      this.pa.updateProjectByRaw(e[2], dummy);
      this.pa.updateProjectByRaw(e[2], project);
      return JSON.stringify(project);
    };

    getui = function() {
      var e, errD, errS, uiD, uiS;
      try {
        uiS = SpreadsheetApp.getUi();
      } catch (error) {
        e = error;
        errS = e;
      }
      try {
        uiD = DocumentApp.getUi();
      } catch (error) {
        e = error;
        errD = e;
      }
      if (errS === errD) {
        throw new Error("This addon cannot be used here.");
      }
      return uiS || uiD;
    };

    return RearrangeScripts;

  })();
  return r.RearrangeScripts = RearrangeScripts;
})(this);
