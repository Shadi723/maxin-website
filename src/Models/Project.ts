export class Project{
  imageUrls: string[];
  projectName: string;
  id: string;
  projectDetails: string;
  projectType: ProjectType;
  constructor(imageUrls: string[], projectName: string, id: string, projectDetails: string, projectType: ProjectType){
      this.imageUrls = imageUrls;
      this.projectName = projectName;
      this.id = id;
      this.projectDetails = projectDetails;
      this.projectType = projectType;
  }
    
}
export const projectConverter = {
  toFirestore(product: Project): firebase.firestore.DocumentData {
    return {
      imageUrl: product.imageUrls,
      projectName: product.projectName,
      id: product.id,
      projectDetails: product.projectDetails,
      projectType: product.projectType,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Project {
    const data = snapshot.data(options)!;
    return new Project(data.imageUrl, data.projectName, data.id, data.projectDetails, data.projectType);
  }
};
type ProjectType =
    | 'Inner Project'
    | 'Outer Project'