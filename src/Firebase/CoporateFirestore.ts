import { detailsConverter } from './../Models/Details';
import { Details } from '../Models/Details';
import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();

export const add_updateCoporate = (path: string, info: Details, file: File | null, type: string) : void => {
    let url: string;
    if(file !==null){
        const imageRef = storage.child(path+ '/images/' + type).put(file);
        imageRef.on(db.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch(snapshot.state){
                case db.storage.TaskState.CANCELED:
                    console.log('upload canceled');
                    break;
                case db.storage.TaskState.ERROR:
                    console.log('upload error');
                    break;
                case db.storage.TaskState.PAUSED:
                    console.log('upload paused');
                    break;
                case db.storage.TaskState.RUNNING:
                    console.log('upload running');
                    break;
            }
            },
            function(error){
                console.log(error);
            },
            async function (){
                // Upload completed successfully, now we can get the download URL

                url=await imageRef.snapshot.ref.getDownloadURL();
                info.imgUrl =  url;
                let doc = firestore.doc(path);
                doc.withConverter(detailsConverter).set(info)
                    .then(() => {})
                    .catch((e) => console.log(e));
            }
        );
    }
    else{
        firestore.doc(path+ '/images/' + type).withConverter(detailsConverter).set(info)
            .then((result) =>{  
            })
            .catch((err) => console.log(err));
    }
}

export const getCoporateInfo = async(path: string): Promise<Details | undefined> => {
    let snapshot = await firestore.doc(path).withConverter(detailsConverter).get();
    if(snapshot.exists)
        return snapshot.data();
    return undefined;
}