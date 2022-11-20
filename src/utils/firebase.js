import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "todo-list-777f8.firebaseapp.com",
    projectId: "todo-list-777f8",
    storageBucket: "todo-list-777f8.appspot.com",
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-6GSEKZ49KM"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFileAndGetUrl = (name, file) => {
    if (!file) return
    const stRef = storageRef(storage, `/todosFiles/${name}`);

    return uploadBytes(stRef, file).then(async () => {
        console.log("File uploaded successfully!")
        return await getDownloadURL(stRef).then(res => res).catch(err => console.log(err))
    }).catch(err => {
        console.log("Error uploading file", err)
    })
}

export const deleteFile = async (name) => {
    if (!name) return
    const stRef = storageRef(storage, `/todosFiles/${name}`);
    
    await deleteObject(stRef).then(() => {
        console.log("File deleted successfully!")
    }).catch((err) => {
        console.log("Error deleting file", err)
    });
}