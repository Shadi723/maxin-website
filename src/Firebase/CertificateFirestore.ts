import { Certificate } from '../Models/Certificate';
import { certificateConverter } from './../Models/Certificate';
import db from './FirebaseAdmin';

export const firestore = db.firestore();
export const storage = db.storage().ref();
export const add_updateCertificate = (path: string, certificate: Certificate, file: File | null, history: any): void => {
    if(file !== null ){
            const imageRef = storage
                .child(path + certificate.id + '/' + certificate.certificateName )
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
                    certificate.imgUrl = url;
                    firestore.doc(path +certificate.id).withConverter(certificateConverter).set(certificate)
                        .then(res => {
                                history.push('/admin/editcertificates');
                            })
                            .catch(err => console.log(err));
                }
            )
    }
    else{
        firestore.doc(path + certificate.id).withConverter(certificateConverter).set(certificate)
            .then((result) =>{
                history.push('/admin/editcertificates');
            })
            .catch((err) => console.log(err));
    }
}

export const getCertificates= async (path: string): Promise<Certificate[]> => {
    let col =await firestore.collection(path).withConverter(certificateConverter).get();
    return col.docs.map(Certificate => Certificate.data())
}

export const getCertificate = async (path: string, id: string) : Promise<Certificate | undefined> => {
    let doc = await firestore.collection(path).doc(id).withConverter(certificateConverter).get();
    return doc.data();
}

export const deleteCertificate = async (path: string, id: string) : Promise<void> =>{
    let certificate =await getCertificate(path, id);
    if(certificate !== undefined){
        await storage.child(path + id  + '/' + certificate.certificateName).delete()
    }
    await firestore.collection(path).doc(id).delete();
}