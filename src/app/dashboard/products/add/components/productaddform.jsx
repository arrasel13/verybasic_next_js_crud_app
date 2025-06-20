"use client";

import { postSingleData } from "@/app/actions/postsingleproduct";
import { useRouter } from "next/navigation";

const ProductAddForm = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.productName.value);
    const form = e.target;
    const productName = form.productName.value;

    const payload = { productName };

    // const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;
    // const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/items`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // const result = await res.json();
    const result = await postSingleData(payload);
    form.reset();
    // router.replace("/products");
    router.push("/products");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          id=""
          placeholder="Product Name"
          className="border px-3 py-1 mr-3"
        />
        <button type="submit" className="btn border px-4 py-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductAddForm;
