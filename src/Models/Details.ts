export class Details{
    description: string;
    imgUrl: string;
    constructor(describtion: string, imgUrl: string){
        this.description = describtion;
        this.imgUrl=imgUrl;
    }
    
}
export const detailsConverter = {
  toFirestore(details: Details): firebase.firestore.DocumentData {
    return {description: details.description, imgUrl: details.imgUrl};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Details {
    const data = snapshot.data(options)!;
    return new Details(data.description, data.imgUrl);
  }
};