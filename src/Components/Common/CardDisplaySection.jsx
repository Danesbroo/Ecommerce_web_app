"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import ProductCart from "../ProductCart";
import NoProductFound from "../NoProductFound";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

const FEATURE_SLUG_MAP = {
"best-selling": "is_best_selling",                                        
  "top-rated": "is_top_rated",
  "on-sale": "is_on_sell",
  "trending-collection": "is_trending",
  "online-store": "is_online_store",
};

export default function CardDisplaySection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams()

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const slugArray = Array.isArray(params?.slug) ? params.slug : [];

  const decoded = decodeURIComponent(params.slug[0]);
  const query = new URLSearchParams(decoded);
  const keyword = query.get("keyword");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const pathfilter = {};

      // this condition for if subcategory select subcategory store in object otherwise feature flag data keep true
      if (params?.slug?.length > 1) {
        pathfilter.sub = params.slug[1]; 
      } else {
        pathfilter[FEATURE_SLUG_MAP[slugArray[0]]] = true;
        pathfilter.keyword = keyword;
      }

      // sub checkbox (merge, not overwrite)
      const subCheckBox = searchParams.get("sub");

      if (subCheckBox) {
        const existingSub = pathfilter.sub
          ? pathfilter.sub.split(",")
          : [];
       
        if (!existingSub.includes(subCheckBox)) {
          existingSub.push(subCheckBox);
        }

        pathfilter.sub = existingSub.join(",");
      }

      //  sorting
      const sorting = searchParams.get("sort_by");
      if (sorting) {
        pathfilter.sort_by = sorting;
      }

      //  material
      const material = searchParams.get("material");
      if (material) {
        pathfilter.material = material;
      }

      //  color
      const color = searchParams.get("color");
      if (color) {
        pathfilter.color = color;
      }

      //  price range 
      const maxprice = searchParams.get("max");
      const minprice = searchParams.get("min");

      if (maxprice) pathfilter.max = Number(maxprice);
      if (minprice) pathfilter.min = Number(minprice);


      try {
        const res = await axios.post(
          process.env.PRODUCTS_VIEW_URL, {...pathfilter,  page: currentPage }
        );
        setProducts(res.data._data || []);
        (res.data._image_path || "");
        setTotalPages(res.data._pagination?.total_pages || 1);
      } catch (err) {
        toast.error("Failed to fetch products!");
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, currentPage, params.slug]);

  // /* ================= PAGE CHANGE ================= */
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    setCurrentPage(page);
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="px-4 py-10 flex justify-center">
        <NoProductFound
          title="No products found"
          message="Sorry! We couldn't find any products matching your filters."
          suggestions={[
            "Clear filters",
            "Try different filters",
            "Browse popular categories",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="px-4 flex flex-col justify-between min-h-[1400px] py-6">
      <div className="grid gap-5 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
        {products.map((product) => (
          console.log("product", product),
          <div key={product._id} className="w-full max-w-[350px]">
            <ProductCart product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="py-4 flex justify-center">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}









