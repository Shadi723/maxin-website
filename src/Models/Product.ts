export class Product{
  imageUrls: string[];
  productName: string;
  id: string;
  productDetails: string;
  constructor(imageUrls: string[], productName: string, id: string, productDetails: string){
      this.imageUrls = imageUrls;
      this.id = id;
      this.productName = productName;
      this.productDetails = productDetails;
  }
    
}
export const productConverter = {
  toFirestore(product: Product): firebase.firestore.DocumentData {
    return {
      imageUrl: product.imageUrls,
      id: product.id,
      productName: product.productName,
      productDetails: product.productDetails,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Product {
    const data = snapshot.data(options)!;
    return new Product(data.imageUrl, data.productName, data.id, data.productDetails);
  }
};