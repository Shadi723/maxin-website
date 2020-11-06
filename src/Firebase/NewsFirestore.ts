import { newsConverter } from './../Models/News';

import { News } from '../Models/News';

import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();

export const add_updateNew = (path: string, news: News, files: File[] | null, history: any): void => {
    let urls: string[] = [];
    if(files !== [] ){
        files?.forEach((file, index) => {
            const imageRef = storage
                .child(path+'/images/' +  index)
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
                    if(url !== undefined)
                        urls.push(url);
                    if(index === files.length -1){
                        news.imageUrls = urls;
                        firestore.doc(path).withConverter(newsConverter).set(news)
                            .then(res => {
                                history.push('/admin/editnews');
                            })
                            .catch(err => console.log(err));
                    }
                }
            )
        })
    }
    else{
        firestore.doc(path  + news.id).withConverter(newsConverter).set(news)
            .then((result) =>{
                history.push('/admin/editnews');
            })
            .catch((err) => console.log(err));
    }
}

export const getNews= async (path: string): Promise<News[]> => {
    let col =await firestore.collection(path).withConverter(newsConverter).get();
    return col.docs.map(news => news.data())
}

export const getNew = async (path: string, id: string) : Promise<News | undefined> => {

    let doc = await firestore.collection(path).doc(id).withConverter(newsConverter).get();
    return doc.data();
}

export const deleteNew = async (path: string, id: string) : Promise<void> =>{
    let news =await getNew(path, id);
    if(news !== undefined){
        news.imageUrls.forEach(async (_, index) => 
                await storage.child(path+ '/'+id +'/images/'+ index).delete()
            )
    }
    await firestore.collection(path).doc(id).delete();
}