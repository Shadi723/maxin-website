import { Project, projectConverter } from './../Models/Project';
import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();
export const add_updateInnerProjects = (path: string, project: Project, files: File[] | null, history: any): void => {
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
                        project.imageUrls = urls;
                        firestore.doc(path).withConverter(projectConverter).set(project)
                            .then(res => {
                                history.push('/admin/innerprojects');
                            })
                            .catch(err => console.log(err));
                    }
                }
            )
        })
    }
    else{
        firestore.doc(path + project.id).withConverter(projectConverter).set(project)
            .then((result) =>{
                history.push('/admin/innerprojects');
            })
            .catch((err) => console.log(err));
    }
}

export const getInnerProjects= async (path: string): Promise<Project[]> => {
    let col =await firestore.collection(path).withConverter(projectConverter).get();
    return col.docs.map(project => project.data())
}

export const getInnerProject = async (path: string, id: string) : Promise<Project | undefined> => {
    let doc = await firestore.collection(path).doc(id).withConverter(projectConverter).get();
    return doc.data();
}

export const deleteInnerProject = async (path: string, id: string) : Promise<void> =>{
    let innerProject =await getInnerProject(path, id);
    if(innerProject !== undefined){
        innerProject.imageUrls.forEach(async (_, index) => 
                await storage.child(path+ '/'+id +'/images/'+ index).delete()
            )
    }
    await firestore.collection(path).doc(id).delete();
}