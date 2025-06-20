import { redirect } from "next/navigation";
import React from "react";
import { getProducts } from "../actions/products/getproducts";

const ProductsPage = async () => {
  // const res = await fetch("http://localhost:3000/api/items", {
  //   cache: "force-cache",
  // });
  const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
  // const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/items`, {
  //   cache: "force-cache",
  // });
  // const data = await res.json();

  const data = await getProducts();

  console.log(data);

  // if (data.data.length > 3) {
  //   redirect("/");
  // }

  return (
    <div className="flex justify-center flex-col items-center gap-5 mt-10">
      {data?.map((singleProduct) => {
        return (
          <div key={singleProduct._id}>
            <h2>{singleProduct.productName}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
