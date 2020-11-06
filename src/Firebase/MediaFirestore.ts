import { mediaConverter } from './../Models/Media';
import { Media } from '../Models/Media';

import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();

export const add_updateMedia = (path: string, media: Media, file: File | null, history: any): void => {
    if(file !== null ){
            const imageRef = storage
                .child(path+'/'+media.id +'/' +  media.mediaName)
                .put(file);
            imageRef.on(db.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
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
                (error) => console.log(error)
             ,
                async () => {
                    let url =await imageRef.snapshot.ref.getDownloadURL();
                    media.imgUrl = url;
                    firestore.doc(path + media.id).withConverter(mediaConverter).set(media)
                        .then(res => {
                                history.push('/admin/editmedia');
                            })
                            .catch(err => console.log(err));
                }
            )
    }
    else{
        firestore.doc(path  + media.id).withConverter(mediaConverter).set(media)
            .then((result) =>{
                history.push('/admin/editmedia');
            })
            .catch((err) => console.log(err));
    }
}

export const getMedias= async (path: string): Promise<Media[]> => {
    let col =await firestore.collection(path).withConverter(mediaConverter).get();
    return col.docs.map(Certificate => Certificate.data())
}

export const getMedia = async (path: string, id: string) : Promise<Media | undefined> => {
    let doc = await firestore.collection(path).doc(id).withConverter(mediaConverter).get();
    return doc.data();
}

export const deleteMedia = async (path: string, id: string) : Promise<void> =>{
    let media =await getMedia(path, id);
    if(media !== undefined){
        await storage.child(path+ '/'+id +'/'+  media.mediaName).delete()
    }
    await firestore.collection(path).doc(id).delete();
}