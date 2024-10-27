// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { request } from "./fetch";

// export async function GET(request: Request) {
//   // Fetch data from some source
//   //   const data = await fetchData();
//   const { searchParams } = new URL(request.url);

//   // Read a cookie value
//   const cookieStore = cookies();
//   const token = cookieStore.get("token");

//   const data = {
//     username: searchParams.get("username"),
//     password: searchParams.get("password"),
//   };
//   const res = await request("POST", data, "api-token-auth/", token);

//   return NextResponse.json({
//     data,
//   });
// }

// async function fetchData() {
//   // Simulate fetching data
//   return { message: "Hello from server!" };
// }
