import { proofImportIsPossible } from "./arbitrary-plugin-module"

// --------------------------------------------------------------------------------------
// API Reference: https://www.amplenote.com/help/developing_amplenote_plugins
// Tips on developing plugins: https://www.amplenote.com/help/guide_to_developing_amplenote_plugins
const plugin = {
  // --------------------------------------------------------------------------------------
   replaceText: {
    check(app) {
      return "keyword";
    },
    async run(app) {
      const noteuuid = await app.context.noteUUID;
      const note = await app.notes.find(noteuuid);
      app.alert(`This task is named ${ note.name }`);
      //app.alert(`This note is named ${ note.name }`);
      const taskUUID = await app.context.taskUUID || "not in a task";
      const task = await app.getTask(taskUUID);
      return note.name + task.content;
    }
  },

   /*async eventOption(app, taskUUID) {
     const task = await app.getTask(taskUUID);
     const noteuuid = await app.context.noteUUID;
     const note = await app.notes.find(noteuuid);
     await app.updateTask(taskUUID, { content: note.name + task.content });
     //task.content = note.name + task.content;
   }*/

   async taskOption(app, task) {
     const noteuuid = await app.context.noteUUID;
     const note = await app.notes.find(noteuuid);
     await app.updateTask(task.uuid, { content: "[" + note.name + "] " + task.content });
     //task.content = note.name + task.content;
  }


  // There are several other entry points available, check them out here: https://www.amplenote.com/help/developing_amplenote_plugins#Actions
  // You can delete any of the insertText/noteOptions/replaceText keys if you don't need them
};
export default plugin;
