export  class Media{
    mediaName: string;
    imgUrl: string;
    id: string;
    constructor(mediaName: string, imgUrl: string, id: string){
        this.mediaName = mediaName;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}

export const mediaConverter = {
  toFirestore(media: Media): firebase.firestore.DocumentData {
    return {mediaName: media.mediaName, imgUrl: media.imgUrl, id: media.id};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Media {
    const data = snapshot.data(options)!;
    return new Media(data.mediaName, data.imgUrl, data.id);
  }
};