// import { Star, UserCircle } from "lucide-react";

// const ReviewCard = ({
//   review,
// }) => {
//   if (!review) return null;

//   const {
//     user,
//     guestName,
//     name,
//     avatar,
//     comment,
//     text,
//     rating = 5,
//     createdAt,
//     date,
//   } = review;

//   const reviewerName =
//     user?.name ||
//     guestName ||
//     name ||
//     "ApexHomes guest";

//   const reviewerAvatar =
//     user?.avatar ||
//     avatar;

//   const reviewText =
//     comment ||
//     text ||
//     "Great stay!";

//   const reviewDate =
//     createdAt ||
//     date;

//   const formattedDate = reviewDate
//     ? new Date(reviewDate).toLocaleDateString(
//         "en-US",
//         {
//           month: "long",
//           year: "numeric",
//         }
//       )
//     : null;

//   return (
//     <article className="border-b border-gray-100 py-6 last:border-b-0">
//       <div className="flex items-start gap-4">
//         {/* Avatar */}
//         {reviewerAvatar ? (
//           <img
//             src={reviewerAvatar}
//             alt={reviewerName}
//             className="h-11 w-11 rounded-full object-cover"
//           />
//         ) : (
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
//             <UserCircle
//               size={25}
//               className="text-gray-500"
//             />
//           </div>
//         )}

//         <div className="min-w-0 flex-1">
//           {/* Name and date */}
//           <div>
//             <h3 className="text-sm font-semibold text-gray-950">
//               {reviewerName}
//             </h3>

//             {formattedDate && (
//               <p className="mt-0.5 text-xs text-gray-500">
//                 {formattedDate}
//               </p>
//             )}
//           </div>

//           {/* Rating */}
//           <div className="mt-2 flex items-center gap-1">
//             {Array.from({ length: 5 }).map(
//               (_, index) => (
//                 <Star
//                   key={index}
//                   size={13}
//                   fill={
//                     index < rating
//                       ? "currentColor"
//                       : "none"
//                   }
//                   className={
//                     index < rating
//                       ? "text-gray-950"
//                       : "text-gray-300"
//                   }
//                 />
//               )
//             )}
//           </div>

//           {/* Review */}
//           <p className="mt-3 text-sm leading-6 text-gray-600">
//             {reviewText}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default ReviewCard;