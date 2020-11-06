export  class Certificate{
    certificateName: string;
    imgUrl: string;
    id: string;
    constructor(cer: string, imgUrl: string, id: string){
        this.certificateName = cer;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}

export const certificateConverter = {
  toFirestore(certificate: Certificate): firebase.firestore.DocumentData {
    return {certificateName: certificate.certificateName, imgUrl: certificate.imgUrl, id: certificate.id};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Certificate {
    const data = snapshot.data(options)!;
    return new Certificate(data.certificateName, data.imgUrl, data.id);
  }
};