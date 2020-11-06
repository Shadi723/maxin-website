export class News{
  imageUrls: string[];
  imageTitle: string;
  description: string;
  id: string;
  report: string;
  constructor(imageUrls: string[], imageTitle: string, description: string, id: string, report: string){
      this.imageUrls = imageUrls;
      this.id = id;
      this.description = description;
      this.imageTitle = imageTitle;
      this.report = report;
  }
    
}
export const newsConverter = {
  toFirestore(news: News): firebase.firestore.DocumentData {
    return {
      imageUrl: news.imageUrls,
      id: news.id,
      describtion: news.description,
      imageTitle: news.imageTitle,
      report: news.report
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): News {
    const data = snapshot.data(options)!;
    return new News(data.imageUrl, data.imageTitle, data.description, data.id, data.report);
  }
};