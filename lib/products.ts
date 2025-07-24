import { collection, getDocs } from "firebase/firestore";
import { db } from '@/lib/firebase';

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        price: data.price,
        barcode: data.barcode,
    };
  });
    
    return products;
};
