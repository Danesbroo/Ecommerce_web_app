
'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowDown, MdOutlineShoppingCart, MdOutlineMenu, MdClose } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import CartSidebar from '../CartSlider';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Logout } from '@/app/ReduxToolkit/loginSlice';
import '../../app/Css/Style.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.token);

  // we use useselector function to get data of initialstate or default value of cart slice
  const cartItems = useSelector((state) => {
    return (state.cartItem.cartItem);
  })
  const totalPrice = cartItems.reduce(   // reduce function is used to calculate total price of all items in cart by multiplying price and quantity of each item and adding it to total.
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [imagePath, setImagePath] = useState('');
  const [companyInfo, setCompanyInfo] = useState({});

  // if input field is blank send it product search page and show all product otherwise show keyword according product.
  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      // Empty → show all products with search mode
      router.push("/products/mode=search");
    } else {
      // Keyword → filtered products
      router.push(
        `/products/mode=search&keyword=${encodeURIComponent(trimmedKeyword)}`
      );
    }
  };

  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_COMPANY_INFO_URL)
      .then((res) => {
        if (res.data._status) {
          setCompanyInfo(res.data._data[0]);
          setCompanyLogo(res.data._data[0]?.image);
          setImagePath(res.data._image_path);
        } else {
          toast.error(res.data._message || "Error fetching company info");
        }
      })
  }, [])

  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_CATAGORY_NEATED_VIEW_URL)
      .then((response) => {
        setCategories(response.data._data || []);
      })
      .catch((error) => {
        toast.error("Something went wrong while fetching menu data");
      });
  }, []);


  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    dispatch(Logout());
    router.push("/");
  };

  // const toggleMegaMenu = (menuName) => {
  //   setActiveMegaMenu((prev) => (prev === menuName ? null : menuName));
  // };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const firstCategory = categories.slice(0, Math.ceil(categories.length / 2)); // divide categories in half
  const secondCategory = categories.slice(Math.ceil(categories.length / 2));

  return (
    <>
      {/* Top Header */}
      <header className='hidden lg:flex justify-between items-center shadow px-8'>
        <div className='text-[11px] py-3.5'>
          Contact us 24/7 : {companyInfo.mobile_number} / {companyInfo.email}
        </div>
        <div className="relative group">
          {isLoggedIn ? (
            <Link href="/my-dashboard" className="text-[14px] py-3.5 hover:text-[#C09578] cursor-pointer">My Dashboard</Link>
          ) : (
            <Link href="/login-register" className="text-[11px] py-3.5 hover:text-[#C09578] cursor-pointer">Login / Register</Link>
          )}
          {isLoggedIn && (
            <div className="absolute top-full left-[-30px] w-[150px] p-2 bg-white shadow text-center rounded z-10 
                opacity-0 translate-y-3 pointer-events-none 
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
                transition-all duration-700 ease-in-out">
              <div className="py-2">
                <p className="pb-2 border-b border-b-gray-200">
                  <Link href="/my-dashboard" className="text-[14px] hover:text-[#C09578] cursor-pointer">My Dashboard</Link>
                </p>
                <p className="pt-2">
                  <button onClick={logout} className="text-[12px] hover:text-[#C09578]">Logout</button>
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Logo, Search, Cart  part*/}
      <section className="shadow py-4 w-full">
        <div className="flex justify-between items-center px-4 sm:px-8 lg:px-8 max-w-[1440px] mx-auto">
          <div className="basis-[30%] lg:basis-[15%]">
            <Link href="/" onClick={() => dispatch(resetFilter())}><img src={`${imagePath}/${companyLogo}`} alt="company logo" className="h-15" /></Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex searchParent">
              <input
                className="h-10 search ps-2"
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />

              <CiSearch
                className="icon cursor-pointer hover:text-[#C09578]"
                onClick={handleSearch}
              />
            </div>


            <Link href="/wishlist" className="p-1.5 rounded-[5px] wishlist">
              <IoIosHeart className="wish text-[25px]" />
            </Link>

            <div className="flex gap-2 cart py-1.5 px-5 items-center cartParent cursor-pointer" onClick={() => setCartOpen(true)}>
              <MdOutlineShoppingCart className="hover:text-[#C09578]" />
              <span className="text-gray-200 hidden md:block">|</span>
              <span className="hover:text-[#C09578] hidden md:block text-sm">Rs {totalPrice}</span>
              <span className="cartvalue text-white top-[3px] md:top-[8px] lg:top-[8px]">{cartItems.length}</span>
            </div>

            {/* Hamburger Button */}
            <div className="p-2 md:p-3 rounded-[5px] lg:hidden cursor-pointer" onClick={() => setMobileOpen(true)}>
              <MdOutlineMenu className="text-2xl md:text-3xl" />
            </div>
          </div>
        </div>
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </section>

      {/* Desktop Navigation */}
      <nav className={`hidden lg:block ${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow bg-white' : 'relative shadow'}`}>
        <div className="flex justify-center gap-20 items-center px-8 py-2">

          <Link href="/" onClick={() => dispatch(resetFilter())} className='text-[#C09578] font-bold text-[14px] cursor-pointer py-5'>HOME</Link>

          {/* LIVING */}
          <div className='flex items-center cursor-pointer py-5 relative group'>
            <span className='font-bold text-[14px]'>SHOP</span> <MdKeyboardArrowDown />
            <div className={`absolute top-full left-0 bg-gray-100 min-h-[300px] shadow-lg z-10 w-[700px] py-10 px-5 gap-3 transition-all duration-300 
               ${activeMegaMenu === 'living' ? 'flex' : 'hidden group-hover:flex'}`}>
              {firstCategory.map((cat, i) => (
                <div key={i} className='basis-[30%]'>
                  <div className='font-bold hover:text-[#C09578]'>
                    <div>{cat.name}</div>
                  </div>
                  <div className='pt-[20px]'>
                    {cat.subCategories?.map((sub, j) => (
                      <div key={j}>
                        <p className='pb-2 text-gray-600'>
                          <Link href={`/products/${cat.slug}/${sub.slug}`}>{sub.name}</Link>
                        </p>
                        {/* we can open this subsubcategory if needed  */}

                        {/* <div className='pl-2'>
                          {sub.subSubCategories?.map((ss, k) => (
                            <p key={k} className='pb-1 text-sm text-gray-600 hover:text-[#C09578]'>
                              <Link href={`/subsubcategory/${ss.slug}`}>{ss.name}</Link>
                            </p>
                          ))}
                        </div>  */}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center cursor-pointer py-5 relative group'>
            <span className='font-bold text-[14px]'>SOFA</span> <MdKeyboardArrowDown />
            <div className={`absolute top-full left-0 bg-gray-100 min-h-[300px] shadow-lg z-10 min-w-[700px] py-10 px-5 gap-3 transition-all duration-300 ${activeMegaMenu === 'sofa' ? 'flex' : 'hidden group-hover:flex'}`}>
              {secondCategory.map((cat, i) => (
                <div key={i} className='basis-[30%]'>
                  <div className='font-bold hover:text-[#C09578]'>
                    <div>{cat.name}</div>
                  </div>

                  <div className='pt-[20px]'>
                    {cat.subCategories?.map((sub, j) => (
                      <div key={j}>
                        <p className='pb-2  text-gray-600'>
                          <Link href={`/products/${cat.slug}/${sub.slug}`}>{sub.name}</Link>
                        </p>

                        {/* <div className='pl-2'>
                          {sub.subSubCategories?.map((ss, k) => (
                            <p key={k} className='pb-1 text-sm text-gray-600 hover:text-[#C09578]'>
                              <Link href={`/subsubcategory/${ss.slug}`}>{ss.name}</Link>
                            </p>
                          ))}
                        </div> */}

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAGES */}
          <div className='flex items-center cursor-pointer py-5 relative group' onClick={() => toggleMegaMenu('pages')}>
            <span className='font-bold text-[14px]'>PAGES</span> <MdKeyboardArrowDown />
            <div className={`absolute top-full left-0 bg-white shadow-lg z-10 w-[200px] py-10 px-5 gap-3 transition-all duration-900 
                ${activeMegaMenu === 'pages' ? 'flex' : 'hidden group-hover:flex'}`}>
              <div className='basis-[100%]'>
                <p className='pb-2'><Link href="/about-us">About Us</Link></p>
                <p className='pb-2'><Link href="/cart">Cart</Link></p>
                <p className='pb-2'><Link href="/checkout">Checkout</Link></p>
                <p className='pb-2'><Link href="/faq">Frequently Questions</Link></p>
              </div>
            </div>
          </div>

          <Link href="/contact-us?cate=hello" className='font-bold text-[14px] py-5'>CONTACT US</Link>
        </div>
      </nav>

      {/* ================= Mobile Menu ================= */}
      {mobileOpen && (
        // <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setMobileOpen(false)}>
        //   <div
        //     className="absolute top-0 left-0 w-[75%] sm:w-[60%] h-full bg-white shadow-lg p-6 overflow-y-auto"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        //     <div className="flex justify-between items-center mb-6">
        //       <Link href="/"><img src="/assets/logo.png" className="h-8" alt="Logo" /></Link>
        //       <MdClose
        //         className="text-2xl cursor-pointer hover:text-[#C09578]"
        //         onClick={() => setMobileOpen(false)}
        //       />
        //     </div>

        //     <nav className="flex flex-col gap-4">
        //       <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        //       {categories.map((cat, i) => (
        //         <details key={i}>
        //           <summary className="cursor-pointer font-semibold text-[#C09578]">{cat.name}</summary>
        //           <div className="pl-4 pt-2">
        //             {subCategories.filter(sub => sub.parent_Id._id === cat._id)
        //               .map((sub, j) => (
        //                 <p key={j}>
        //                   <Link href="/product-listing" onClick={() => setMobileOpen(false)}>
        //                     {sub.name}
        //                   </Link>
        //                 </p>
        //               ))}
        //           </div>
        //         </details>
        //       ))}
        //       <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        //       <Link href="/about-us" onClick={() => setMobileOpen(false)}>About Us</Link>
        //     </nav>
        //   </div>
        // </div>
        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>

          {categories.map((cat, i) => (
            <details key={i}>
              <summary className="cursor-pointer font-semibold text-[#C09578]">
                {cat.name}
              </summary>

              <div className="pl-4 pt-2">
                {cat.subCategories?.map((sub, j) => (
                  <details key={j}>
                    <summary className="cursor-pointer text-sm">{sub.name}</summary>

                    {/* <div className="pl-4">
                      {sub.subSubCategories?.map((ss, k) => (
                        <p key={k}>
                          <Link href={`/subsubcategory/${ss.slug}`} onClick={() => setMobileOpen(false)}>
                            {ss.name}
                          </Link>
                        </p>
                      ))}
                    </div> */}

                  </details>
                ))}
              </div>
            </details>
          ))}

          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>About Us</Link>
        </nav>

      )}

    </>
  );
}

// new code 
// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { MdKeyboardArrowDown, MdOutlineShoppingCart, MdOutlineMenu } from "react-icons/md";
// import { IoIosHeart } from "react-icons/io";
// import { CiSearch } from "react-icons/ci";
// import CartSidebar from '../CartSlider';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { Logout } from '@/app/ReduxToolkit/loginSlice';
// import '../../app/Css/Style.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default function Header() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.login.token);

//   const cartItems = useSelector((state)=> state.cartItem.cartItem);

//   const [mounted, setMounted] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeMegaMenu, setActiveMegaMenu] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [keyword, setKeyword] = useState("");

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   // ================================
//   // 1️⃣ FETCH CATEGORIES
//   // ================================
//   useEffect(() => {
//     axios.post('http://localhost:4000/api/website/nested-category/view')
//       .then((response) => setCategories(response.data._data || []))
//       .catch(() => toast.error("Something went wrong while fetching menu data"));
//   }, []);

//   // ================================
//   // 2️⃣ STICKY HEADER
//   // ================================
//   useEffect(() => {
//     const handleScroll = () => setIsSticky(window.scrollY > 100);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // ================================
//   // 3️⃣ LOGOUT
//   // ================================
//   const logout = () => {
//     dispatch(Logout());
//     router.push("/");
//   };

//   // ================================
//   // 4️⃣ SEARCH FUNCTION
//   // ================================
//   const handleSearch = () => {
//     const trimmedKeyword = keyword.trim();
//     if (!trimmedKeyword) router.push("/products/search");
//     else router.push(`/products/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
//   };

//   // ================================
//   // 5️⃣ SUBCATEGORY ROUTING FUNCTION
//   // ================================
//   const goToCategory = (catSlug, subSlug) => {
//     router.push({
//       pathname: "/products/search",
//       query: {
//         parent_category_slug: catSlug,
//         sub_category_slug: subSlug,

//         // Flags: backend supports these
//         is_best_selling: false,
//         is_trending: false,
//         is_top_rated: false,
//         is_on_sell: false,
//         is_online_store: false,

//         keyword: keyword || ""
//       },
//     });
//   };

//   // ================================
//   // 6️⃣ SPLIT CATEGORIES FOR MENU
//   // ================================
//   const firstCategory = categories.slice(0, Math.ceil(categories.length / 2));
//   const secondCategory = categories.slice(Math.ceil(categories.length / 2));

//   return (
//     <>
//       {/* ================= TOP HEADER ================= */}
//       <header className='hidden lg:flex justify-between items-center shadow px-8'>
//         <div className='text-[11px] py-3.5'>
//           Contact us 24/7 : +91-98745612330 / furnitureinfo@gmail.com
//         </div>
//         <div className="relative group">
//           {isLoggedIn ? (
//             <Link href="/my-dashboard" className="text-[14px] py-3.5 hover:text-[#C09578] cursor-pointer">My Dashboard</Link>
//           ) : (
//             <Link href="/login-register" className="text-[11px] py-3.5 hover:text-[#C09578] cursor-pointer">Login / Register</Link>
//           )}
//           {isLoggedIn && (
//             <div className="absolute top-full left-[-30px] w-[150px] p-2 bg-white shadow text-center rounded z-10 
//                 opacity-0 translate-y-3 pointer-events-none 
//                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto 
//                 transition-all duration-700 ease-in-out">
//               <div className="py-2">
//                 <p className="pb-2 border-b border-b-gray-200">
//                   <Link href="/my-dashboard" className="text-[14px] hover:text-[#C09578] cursor-pointer">My Dashboard</Link>
//                 </p>
//                 <p className="pt-2">
//                   <button onClick={logout} className="text-[12px] hover:text-[#C09578]">Logout</button>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ================= LOGO + SEARCH + CART ================= */}
//       <section className="shadow py-4 w-full">
//         <div className="flex justify-between items-center px-4 sm:px-8 lg:px-8 max-w-[1440px] mx-auto">
//           <div className="basis-[30%] lg:basis-[15%]">
//             <Link href="/"><img src="/assets/logo.png" alt="company logo" className="h-10" /></Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="hidden lg:flex searchParent">
//               <input className="h-10 search ps-2" type="text" placeholder="Search products..." value={keyword}
//         onChange={(e) => setKeyword(e.target.value)} />
//               <CiSearch className="icon hover:text-[#C09578]" onClick={handleSearch}/>
//             </div>

//             <Link href="/wishlist" className="p-1.5 rounded-[5px] wishlist">
//               <IoIosHeart className="wish text-[25px]" />
//             </Link>

//             <div className="flex gap-2 cart py-1.5 px-5 items-center cartParent cursor-pointer" onClick={() => setCartOpen(true)}>
//               <MdOutlineShoppingCart className="hover:text-[#C09578]" />
//               <span className="text-gray-200 hidden md:block">|</span>
//               <span className="hover:text-[#C09578] hidden md:block text-sm">Rs 0.00</span>
//               <span className="cartvalue text-white top-[3px] md:top-[8px] lg:top-[8px]">{cartItems.length}</span>
//             </div>

//             {/* Hamburger Button */}
//             <div className="p-2 md:p-3 rounded-[5px] lg:hidden cursor-pointer" onClick={() => setMobileOpen(true)}>
//               <MdOutlineMenu className="text-2xl md:text-3xl" />
//             </div>
//           </div>
//         </div>
//         <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
//       </section>

//       {/* ================= DESKTOP NAVIGATION ================= */}
//       <nav className={`hidden lg:block ${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow bg-white' : 'relative shadow'}`}>
//         <div className="flex justify-center gap-20 items-center px-8 py-2">

//           <Link href="/" className='text-[#C09578] font-bold text-[14px] cursor-pointer py-5'>HOME</Link>

//           {/* ================= FIRST CATEGORY MENU ================= */}
//           <div className='flex items-center cursor-pointer py-5 relative group'>
//             <span className='font-bold text-[14px]'>SHOP</span> <MdKeyboardArrowDown />
//             <div className={`absolute top-full left-0 bg-gray-100 min-h-[300px] shadow-lg z-10 w-[700px] py-10 px-5 gap-3 transition-all duration-300 
//                ${activeMegaMenu === 'living' ? 'flex' : 'hidden group-hover:flex'}`}>
//               {firstCategory.map((cat, i) => (
//                 <div key={i} className='basis-[30%]'>
//                   <div className='font-bold hover:text-[#C09578]'>
//                     <div>{cat.name}</div>
//                   </div>
//                   <div className='pt-[20px]'>
//                     {cat.subCategories?.map((sub, j) => (
//                       <div key={j}>
//                         <p className='pb-2 text-gray-600'>
//                           <span
//                             onClick={() => goToCategory(cat.slug, sub.slug)}
//                             className='cursor-pointer hover:text-[#C09578]'
//                           >
//                             {sub.name}
//                           </span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ================= SECOND CATEGORY MENU ================= */}
//           <div className='flex items-center cursor-pointer py-5 relative group'>
//             <span className='font-bold text-[14px]'>SOFA</span> <MdKeyboardArrowDown />
//             <div className={`absolute top-full left-0 bg-gray-100 min-h-[300px] shadow-lg z-10 min-w-[700px] py-10 px-5 gap-3 transition-all duration-300`}>
//               {secondCategory.map((cat, i) => (
//                 <div key={i} className='basis-[30%]'>
//                   <div className='font-bold hover:text-[#C09578]'>
//                     <div>{cat.name}</div>
//                   </div>
//                   <div className='pt-[20px]'>
//                     {cat.subCategories?.map((sub, j) => (
//                       <div key={j}>
//                         <p className='pb-2 text-gray-600'>
//                           <span
//                             onClick={() => goToCategory(cat.slug, sub.slug)}
//                             className='cursor-pointer hover:text-[#C09578]'
//                           >
//                             {sub.name}
//                           </span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Link href="/contact-us" className='font-bold text-[14px] py-5'>CONTACT US</Link>
//         </div>
//       </nav>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileOpen && (
//         <nav className="flex flex-col gap-4 p-4 bg-white fixed inset-0 z-50 overflow-y-auto">
//           <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
//           {categories.map((cat, i) => (
//             <details key={i}>
//               <summary className="cursor-pointer font-semibold text-[#C09578]">{cat.name}</summary>
//               <div className="pl-4 pt-2">
//                 {cat.subCategories?.map((sub, j) => (
//                   <span
//                     key={j}
//                     onClick={() => {
//                       goToCategory(cat.slug, sub.slug);
//                       setMobileOpen(false);
//                     }}
//                     className="cursor-pointer block py-1"
//                   >
//                     {sub.name}
//                   </span>
//                 ))}
//               </div>
//             </details>
//           ))}
//           <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</Link>
//         </nav>
//       )}

//     </>
//   );
// }






















