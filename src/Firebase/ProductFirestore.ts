import { Product, productConverter } from '../Models/Product';
import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();

export const addInfo = (path: string, desc: string, file: File | null) : void => {
    let url: string;
    if(file !==null){
        const imageRef = storage.child(path+ '/images/' + file.name).put(file);
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
                let doc = firestore.doc(path);
                doc.set({
                    desc: desc,
                    imgUrl: url,})
                    .then(() => console.log('added correctly'))
                    .catch((e) => console.log(e));
            }
        );
    }
}


export const add_updateProducts = (path: string, product: Product, files: File[] | null, history: any): void => {
    let urls: string[] = [];
    if(files !== [] && files !== null ){
        files.forEach((file, index) => {
            const imageRef = storage
                .child(path+'/images/' +  index )
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
                        product.imageUrls = urls;
                        firestore.doc(path).withConverter(productConverter).set(product)
                            .then(res => {
                                history.push('/admin/pvcprofiles');
                            })
                            .catch(err => console.log(err));
                    }
                }
            )
        })
    }
    else{
        firestore.doc(path  + product.id).withConverter(productConverter).set(product)
            .then((result) =>{
                history.push('/admin/pvcprofiles');
            })
            .catch((err) => console.log(err));
    }
}

export const getProducts= async (path: string): Promise<Product[]> => {
    let col =await firestore.collection(path).withConverter(productConverter).get();
    return col.docs.map(product => product.data())
}

export const getProduct = async (path: string, id: string) : Promise<Product | undefined> => {
    let doc = await firestore.collection(path).doc(id).withConverter(productConverter).get();
    return doc.data();
}

export const deleteProduct = async (path: string, id: string) : Promise<void> =>{
    let product =await getProduct(path, id);
    if(product !== undefined){
        product.imageUrls.forEach(async (_, index) => 
                await storage.child(path+ '/'+id +'/images/'+ index).delete()
            )
    }
    await firestore.collection(path).doc(id).delete();
}