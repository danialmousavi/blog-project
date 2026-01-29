
export const GetCategories=async()=>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
    if(!response.ok){
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const data:CategoryType[]=await response.json();
    return data
}